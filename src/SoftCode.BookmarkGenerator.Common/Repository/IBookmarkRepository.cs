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
    }
}
