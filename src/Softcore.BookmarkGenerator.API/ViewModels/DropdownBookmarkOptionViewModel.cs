using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SoftCode.BookmarkGenerator.API.ViewModels
{
    public class DropdownBookmarkOptionViewModel : BookmarkOptionViewModelBase
    {
        public IEnumerable<KeyValuePair<string, string>> DropdownOptions { get; set; }

        public DropdownBookmarkOptionViewModel()
        {
            ControlType = "dropdown";
        }
    }
}
