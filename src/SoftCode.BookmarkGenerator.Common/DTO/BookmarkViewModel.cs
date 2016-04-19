using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SoftCode.BookmarkGenerator.Common.DTO
{
    //this should not be in common but IBookmarkRepository is here.
    public class BookmarkViewModel : Bookmark
    {
        public bool HasBookmarkOptions { get; set; }
    }
}
