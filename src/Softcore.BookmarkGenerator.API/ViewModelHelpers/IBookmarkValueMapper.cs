using SoftCode.BookmarkGenerator.Common.DTO;
using Softcore.BookmarkGenerator.API.ViewModels;
using System.Collections.Generic;

namespace Softcore.BookmarkGenerator.API.ViewModelHelpers
{
    public interface IBookmarkValueMapper
    {
        IEnumerable<BookmarkOptionViewModelBase> CreateBookmarkOptionViewModel(IEnumerable<BookmarkOption> bookmarkOptions);
    }
}
