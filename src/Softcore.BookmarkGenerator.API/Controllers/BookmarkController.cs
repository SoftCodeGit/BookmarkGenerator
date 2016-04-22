using System;
using System.Collections.Generic;
using Microsoft.AspNet.Mvc;
using SoftCode.BookmarkGenerator.Common.Repository;
using SoftCode.BookmarkGenerator.Common.DTO;
using SoftCode.BookmarkGenerator.Common.Helpers;
using Microsoft.Extensions.Logging;
using SoftCode.BookmarkGenerator.API.ViewModelHelpers;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNet.Cors;


// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace SoftCode.BookmarkGenerator.API.Controllers
{
    /// <summary>
    /// Controller encapsulates Bookmark functionality
    /// </summary>
    [Route("api/[controller]")]
    public class BookmarkController : Controller
    {
        private readonly IBookmarkRepository _bookmarkRepository;
        private readonly IBookmarkValueMapper _bookmarkValueMapper;
        private readonly IConnectionStringHelper _connectionStringHelper;
        private readonly ILogger<BookmarkController> _logger;

        /// <summary>
        /// Avoid newing objects, objects should injected to avoid dependencies.
        /// Notice that we do not need to deal with things like initializing the Repository. All that is taken care of by the IOC container.
        /// We are currently using container by Microsoft. You can go to Startup.cs to see how objects are configured.
        /// </summary>
        /// <param name="bookmarkRepository">Access bookmark data</param>
        /// <param name="connectionStringHelper">Helper to facilate connection string construction</param>
        /// <param name="logger">A logging provider, we are using SeriLog currently</param>
        public BookmarkController(IBookmarkRepository bookmarkRepository, IConnectionStringHelper connectionStringHelper, 
                ILogger<BookmarkController> logger, IBookmarkValueMapper bookmarkValueMapper)
        {
            _bookmarkRepository = bookmarkRepository;
            _connectionStringHelper = connectionStringHelper;
            _logger = logger;
            _bookmarkValueMapper = bookmarkValueMapper;
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
        public IActionResult GetBookmarkOptionsByBookmarkCode([FromQuery] DatabaseLocation dbLocation, string bookmarkCode)
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
                        return HttpNotFound(string.Format("Unable to locate values for {0}", bookmarkCode));
                    }

                    return new JsonResult(_bookmarkValueMapper.CreateBookmarkOptionViewModel(bookmarkOptions), 
                        new Newtonsoft.Json.JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver()});
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

        /// <summary>
        /// Call this using url like: http://localhost:51989/api/bookmark/BookmarkOptions/BookmarkReportContext?ServerName=6530-DEV&DbName=BookmarkTool
        /// Pass ServerName and Database name in query string ie. ?ServerName=6530-DEV&DbName=BookmarkTool
        /// </summary>
        /// <param name="dbLocation">POCO containing database location info the user intend to use</param>
        /// <returns>A list of ReportContext that are used for Bookmarks</returns>
        [HttpGet]
        [Route("BookmarkReportContext")]
        public IActionResult GetBookmarkReportContexts([FromQuery] DatabaseLocation dbLocation)
        {
            if (dbLocation != null && ModelState.IsValid)
            {
                IEnumerable<ReportContext> reportContexts;
                try
                {
                    // only reason we set the connection string here is because that's part of the requirement.
                    // normally, connection strings are injected into repository objects and we won't ever need to deal with 
                    // it.
                    _bookmarkRepository.ConnectionString = _connectionStringHelper.GetConnectionString(dbLocation);
                    reportContexts = _bookmarkRepository.GetBookmarkReportContexts();
                    if (reportContexts == null)
                    {
                        return HttpNotFound();
                    }

                    return new JsonResult(reportContexts);
                }
                catch (Exception ex)
                {
                    // log
                    _logger.LogError(string.Format("DBServer: {0}, DBName: {1}", dbLocation.ServerName, dbLocation.DbName), ex);
                    // return not success to client
                    string errorString = string.Format("An error occurred retrieving Bookmark Report Contexts");
                    return HttpBadRequest(errorString);
                }
            }

            return HttpBadRequest("Missing database location data: both ServerName and DbName are required.");
        }

        /// <summary>
        /// Call this using url like: http://localhost:51989/api/bookmark/SearchBookmarks?ServerName=6530-DEV&DbName=BookmarkTool&ReportContextCode=ACTION&SearchCriteria=Date
        /// In the request body, use this json object: {"ServerName": "TARGHEE", "DbName": "BookmarkTool"}
        /// </summary>
        /// <param name="dbLocation">POCO containing database location info the user intend to use</param>
        /// <param name="reportContextCode">ReportContextCode used determine the hierarchy of bookmarks which may be returned</param>
        /// <param name="searchCriteria">Search criteria used to filter bookmarks</param>
        /// <returns>A list of Bookmarks for a specific Report Context hierarchy that match optional search criteria</returns>
        [HttpGet]
        [Route("SearchBookmarks")]
        public IActionResult SearchBookmarks([FromQuery] DatabaseLocation dbLocation, [FromQuery]string reportContextCode, [FromQuery]string searchCriteria)
        {
            if (dbLocation != null && ModelState.IsValid)
            {
                IEnumerable<BookmarkViewModel> bookmarks;
                try
                {
                    _bookmarkRepository.ConnectionString = _connectionStringHelper.GetConnectionString(dbLocation);
                    bookmarks = _bookmarkRepository.SearchBookmarks(reportContextCode, searchCriteria);
                    if (bookmarks == null)
                    {
                        return HttpNotFound();
                    }

                    return new JsonResult(bookmarks);
                }
                catch (Exception ex)
                {
                    //TODO handle null parameters
                    // log
                    _logger.LogError(string.Format("ReportContext: {0}, SearchCritiera: {1}, DBServer: {2}, DBName: {3}", reportContextCode, searchCriteria, dbLocation.ServerName, dbLocation.DbName), ex);
                    // return not success to client
                    string errorString = string.Format("An error occurred retrieving Bookmarks for Report Context {0} and Search Criteria", reportContextCode, searchCriteria);
                    return HttpBadRequest(errorString);
                }
            }

            return HttpBadRequest("Missing database location data: both ServerName and DbName are required.");
        }

    }
}
