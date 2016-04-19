using SoftCode.BookmarkGenerator.Common.DTO;
using System.Collections.Generic;


namespace SoftCode.BookmarkGenerator.Common.Repository
{
    public interface IBookmarkRepository
    {
        string ConnectionString { set; }

        IEnumerable<BookmarkOption> GetBookBookmarkOptionsByBookmarkCode(string bookmarkCode);

        IEnumerable<Bookmark> GetBookmarksByContextCode(string contextCode);

        IEnumerable<string> GetContextCodes();

        IEnumerable<ReportContext> GetBookmarkReportContexts();

        //this returns a view model which should be defined in api\viewmodels
        //how can Repository be in Common if it must return View Models
        IEnumerable<BookmarkViewModel> SearchBookmarks(string reportContextCode, string searchCriteria);
    }
}
