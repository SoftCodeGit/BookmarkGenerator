using System;
using System.Collections.Generic;
using SoftCode.BookmarkGenerator.Common.DTO;
using Softcore.BookmarkGenerator.API.ViewModels;
using System.Linq;

namespace Softcore.BookmarkGenerator.API.ViewModelHelpers
{
    public class BookmarkValueMapper : IBookmarkValueMapper
    {
        private Dictionary<string, string> _controlTypeMap;
        public Dictionary<string, string> ControlTypeMap {
            get
            {
                if (_controlTypeMap == null)
                {
                    _controlTypeMap = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
                    {
                        {"checkbox", "checkbox" },
                        {"selectsingle", "dropdown"},
                        {"text", "textbox" }
                    };
                }
                return _controlTypeMap;
            }
        }

        public IEnumerable<BookmarkOptionViewModelBase> CreateBookmarkOptionViewModel(IEnumerable<BookmarkOption> bookmarkOptions)
        {
            if (bookmarkOptions == null)
                throw new ArgumentNullException("BookmarkOption list argument cannot be null.");

            /* things we need to implement
            1) checkbox => checkbox
            2) SelectSingle => dropdown
            3) Text => textbox
            */

            var returnList = new List<BookmarkOptionViewModelBase>();

            foreach(var item in bookmarkOptions)
            {
                returnList.Add(CreateBookmarkOptionObject<object>(item));
            }
            return returnList;
        }

        // I guess I can create a factory class for this
        private BookmarkOptionViewModelBase CreateBookmarkOptionObject<T>(BookmarkOption bookmarkOption)
        {
            BookmarkOptionViewModelBase bookmarkOptionViewModelBase = null;
            switch (bookmarkOption.DisplayType.ToLower())
            {
                case "selectsingle":
                    var dropdownVM = new DropdownBookmarkOptionViewModel
                    {
                        ControlType = ControlTypeMap[bookmarkOption.DisplayType],
                        Key = bookmarkOption.BookmarkOptionNumber,
                        Label = bookmarkOption.BookmarkOptionNumber
                    };
                    var list = new List<KeyValuePair<string, string>>();
                    bookmarkOption.BookmarkValueList.ForEach(
                        value => 
                        {
                            list.Add(new KeyValuePair<string, string>(value.BookmarkOptionValue, value.BookmarkOptionValueDesc));
                        });

                    dropdownVM.DropdownOptions = list;
                    bookmarkOptionViewModelBase = dropdownVM;
                    break;
                case "text":
                    bookmarkOptionViewModelBase = new TextboxBookmarkOptionViewModel
                    {
                        ControlType = ControlTypeMap[bookmarkOption.DisplayType],
                        Key = bookmarkOption.BookmarkOptionNumber,
                        Label = bookmarkOption.BookmarkOptionNumber,
                        Value = bookmarkOption.BookmarkValueList[0].BookmarkOptionValue
                    };
                    break;
                case "checkbox":
                    bookmarkOptionViewModelBase = new CheckboxBookmarkOptionViewModel
                    {
                        ControlType = ControlTypeMap[bookmarkOption.DisplayType],
                        Key = bookmarkOption.BookmarkOptionNumber,
                        Label = bookmarkOption.BookmarkOptionNumber
                    };
                    break;
                
            }

            return bookmarkOptionViewModelBase;
        }
    }
}
