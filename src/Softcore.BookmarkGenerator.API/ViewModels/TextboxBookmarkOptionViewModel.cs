using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Softcore.BookmarkGenerator.API.ViewModels
{
    public class TextboxBookmarkOptionViewModel : BookmarkOptionViewModelBase
    {
        public string Type { get; set; }

        public TextboxBookmarkOptionViewModel()
        {
            ControlType = "textbox";
        }
    }
}
