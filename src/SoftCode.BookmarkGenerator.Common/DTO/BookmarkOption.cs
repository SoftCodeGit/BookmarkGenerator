using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SoftCode.BookmarkGenerator.Common.DTO
{
    public class BookmarkOption
    {
        public string BookmarkCode { get; set; }

        public string BookmarkOptionDesc { get; set; }

        public string BookmarkOptionNumber { get; set; }

        public string DisplayType { get; set; }

        public int BookmarkOptionValueGroupId { get; set; }

        public string DataSourceName { get; set; }

        public List<BookmarkValue> BookmarkValueList { get; set; }
    }
}
