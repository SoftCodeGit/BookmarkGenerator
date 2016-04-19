using Newtonsoft.Json;

namespace SoftCode.BookmarkGenerator.API.ViewModels
{
    public class BookmarkOptionViewModelBase
    {
        [JsonIgnore()]
        public string Value { get; set; }

        public string Key { get; set; }

        public string Label { get; set; }

        public bool Required { get; set; }

        public int Order { get; set; }

        public string ControlType { get; set; }

    }
}
