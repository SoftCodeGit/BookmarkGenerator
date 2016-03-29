using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SoftCode.BookmarkGenerator.Common.DTO
{
    public class Bookmark
    {
        public string BookmarkCode { get; set; }

        public string ReportContextCode { get; set; }

        public string SubReportContextCode { get; set; }

        public string BookmarkDesc { get; set; }

        public bool IsHelper { get; set; }
    }
}
