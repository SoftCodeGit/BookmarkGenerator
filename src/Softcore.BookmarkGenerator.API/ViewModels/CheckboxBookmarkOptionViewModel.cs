using Newtonsoft.Json;

namespace SoftCode.BookmarkGenerator.API.ViewModels
{
    public class CheckboxBookmarkOptionViewModel : BookmarkOptionViewModelBase
    {
        public CheckboxBookmarkOptionViewModel()
        {
            ControlType = "checkbox";
        }
    }
}
