using Newtonsoft.Json;

namespace Softcore.BookmarkGenerator.API.ViewModels
{
    public class CheckboxBookmarkOptionViewModel : BookmarkOptionViewModelBase
    {
        public CheckboxBookmarkOptionViewModel()
        {
            ControlType = "checkbox";
        }
    }
}
