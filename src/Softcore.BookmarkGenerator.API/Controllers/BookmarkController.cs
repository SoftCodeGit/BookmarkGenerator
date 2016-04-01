using System;
using System.Collections.Generic;
using Microsoft.AspNet.Mvc;
using SoftCode.BookmarkGenerator.Common.Repository;
using SoftCode.BookmarkGenerator.Common.DTO;
using SoftCode.BookmarkGenerator.Common.Helpers;
using Microsoft.Extensions.Logging;


// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace SoftCode.BookmarkGenerator.API.Controllers
{
    /// <summary>
    /// Controller encapsulates Bookmark functionality
    /// </summary>
    [Route("api/[controller]")]
    public class BookmarkController : Controller
    {
        private IBookmarkRepository _bookmarkRepository;
        private IConnectionStringHelper _connectionStringHelper;
        private ILogger<BookmarkController> _logger;

        /// <summary>
        /// Avoid newing objects, objects should injected to avoid dependencies.
        /// Notice that we do not need to deal with things like initializing the Repository. All that is taken care of by the IOC container.
        /// We are currently using container by Microsoft. You can go to Startup.cs to see how objects are configured.
        /// </summary>
        /// <param name="bookmarkRepository">Access bookmark data</param>
        /// <param name="connectionStringHelper">Helper to facilate connection string construction</param>
        /// <param name="logger">A logging provider, we are using SeriLog currently</param>
        public BookmarkController(IBookmarkRepository bookmarkRepository, IConnectionStringHelper connectionStringHelper, 
                ILogger<BookmarkController> logger)
        {
            _bookmarkRepository = bookmarkRepository;
            _connectionStringHelper = connectionStringHelper;
            _logger = logger;
        }

        /// <summary>
        /// Call this using url like: http://localhost:51989/api/bookmark/BookmarkOptions/ActionFeeAmount
        /// In the request body, use this json object: {"ServerName": "TARGHEE", "DbName": "BookmarkTool"}
        /// </summary>
        /// <param name="dbLocation">POCO containing database location info the user intend to use</param>
        /// <param name="bookmarkCode">BookmarkCode as defined in SYS_BookmarkOption_Proposed. Note: not all codes return values currently.</param>
        /// <returns>A list of BookmarkCode with a child list of BookmarkValues</returns>
        [HttpGet("{bookmarkCode}")]
        [Route("BookmarkOptions/{bookmarkCode}")]
        public IActionResult GetBookmarkOptionsByBookmarkCode([FromBody] DatabaseLocation dbLocation, string bookmarkCode)
        {
            if (dbLocation != null && ModelState.IsValid)
            {
                IEnumerable<BookmarkOption> bookmarkOptions;
                try
                {
                    // only reason we set the connection string here is because that's part of the requirement.
                    // normally, connection strings are injected into repository objects and we won't ever need to deal with 
                    // it.
                    _bookmarkRepository.ConnectionString = _connectionStringHelper.GetConnectionString(dbLocation);
                    bookmarkOptions = _bookmarkRepository.GetBookBookmarkOptionsByBookmarkCode(bookmarkCode);
                    if (bookmarkOptions == null)
                    {
                        return HttpNotFound();
                    }
                    return new ObjectResult(bookmarkOptions);
                }
                catch (Exception ex)
                {
                    // log
                    _logger.LogError(string.Format("BookmarkCode: {0}, DBServer: {1}, DBName: {2}", bookmarkCode, dbLocation.ServerName, dbLocation.DbName), ex);
                    // return not success to client
                    string errorString = string.Format("An error occurred retrieving BookmarkOptions for BookmarkCode {0}", bookmarkCode);
                    return HttpBadRequest(errorString);
                }
            }

            return HttpBadRequest("Missing database location data: both ServerName and DbName are required.");
        }
    }
}
