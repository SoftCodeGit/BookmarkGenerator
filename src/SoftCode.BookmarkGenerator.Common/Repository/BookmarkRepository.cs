using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.SqlClient;
using System.Data.Common;
using SoftCode.BookmarkGenerator.Common.DTO;
using Dapper;

namespace SoftCode.BookmarkGenerator.Common.Repository
{
    public class BookmarkRepository : IBookmarkRepository
    {
        private DbConnection _dbConnection;

        public BookmarkRepository() { }

        public string ConnectionString {
            set {
                if (_dbConnection == null)
                    _dbConnection = new SqlConnection(value);
            }
        }

        public IEnumerable<BookmarkOption> GetBookBookmarkOptionsByBookmarkCode(string bookmarkCode)
        {
            var dedupedOptions = new Dictionary<string, BookmarkOption>();
            var queryResult = _dbConnection.Query<BookmarkOption, BookmarkValue, BookmarkOption>(
                "dbo.USP_BookmarkOptionByCode",
                (bmCode, bmValue) =>
                {
                    BookmarkOption bookmarkOption;
                    string dedupedKey =
                        !string.IsNullOrEmpty(bmCode.BookmarkOptionNumber) ? bmCode.BookmarkOptionNumber : bmCode.BookmarkOptionDesc;
                    if (!dedupedOptions.TryGetValue(dedupedKey, out bookmarkOption))
                        dedupedOptions.Add(dedupedKey, bookmarkOption = bmCode);
                    if (bookmarkOption.BookmarkValueList == null)
                        bookmarkOption.BookmarkValueList = new List<BookmarkValue>();
                    if (bmValue != null)
                        bookmarkOption.BookmarkValueList.Add(bmValue);

                    return bookmarkOption;
                },
                new { BookmarkCode = bookmarkCode },
                splitOn: "BookmarkOptionValueGroupId",
                commandType: System.Data.CommandType.StoredProcedure
                );

            return dedupedOptions.Count > 0 ? dedupedOptions.Select(item => item.Value) : null;
        }

        public IEnumerable<Bookmark> GetBookmarksByContextCode(string contextCode)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<string> GetContextCodes()
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ReportContext> GetBookmarkReportContexts()
        {
            var sql =
                    @"select distinct bm.ReportContextCode, rc.ReportContextDesc
                    from SYS_Bookmark bm
                    inner join SYS_ReportContext rc on rc.ReportContextCode = bm.ReportContextCode
                    order by rc.ReportContextDesc";

            return _dbConnection.Query<ReportContext>(sql);
        }
    }
}
