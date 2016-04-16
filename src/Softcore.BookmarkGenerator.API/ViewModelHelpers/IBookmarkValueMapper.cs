using SoftCode.BookmarkGenerator.Common.DTO;
using SoftCode.BookmarkGenerator.API.ViewModels;
using System.Collections.Generic;

namespace SoftCode.BookmarkGenerator.API.ViewModelHelpers
{
    public interface IBookmarkValueMapper
    {
        IEnumerable<BookmarkOptionViewModelBase> CreateBookmarkOptionViewModel(IEnumerable<BookmarkOption> bookmarkOptions);
    }
}
