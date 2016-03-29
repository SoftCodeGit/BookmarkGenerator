using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using SoftCode.BookmarkGenerator.Common.DTO;
using SoftCode.BookmarkGenerator.Common.Repository;
using Softcore.BookmarkGenerator.API.Models;
using Newtonsoft.Json;
using System.Net.Http;


// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Softcore.BookmarkGenerator.API.Controllers
{
    [Route("api/[controller]")]
    public class BookmarkController : Controller
    {
        IBookmarkRepository _bookmarkRepository;

        public BookmarkController(IBookmarkRepository bookmarkRepository)
        {
            _bookmarkRepository = bookmarkRepository;
        }

        [HttpGet]
        public IActionResult GetBookmarkOptionsByBookmarkCode(DatabaseMetaData dbMeta, string bookmarkCode)
        {
            IEnumerable<BookmarkOption> bookmarkOptions;
            try
            {
                _bookmarkRepository.ConnectionString = new Helpers.SqlConnectionStringHelper(dbMeta.ServerName, dbMeta.DbName).ConnectionString;
                bookmarkOptions = _bookmarkRepository.GetBookBookmarkOptionsByBookmarkCode(bookmarkCode);
                if (bookmarkOptions == null)
                {
                    return HttpNotFound();
                }
                return new ObjectResult(bookmarkOptions);
            }
            catch(Exception ex)
            {
                // log
                // return not success to client 
                return (IActionResult) (new HttpRequestException(string.Format("An error occurred while executing GetBookmarkOptionsByBookmarkCode with BookmarkCode: {0}", bookmarkCode), ex));
            }

            

        }
    }
}
