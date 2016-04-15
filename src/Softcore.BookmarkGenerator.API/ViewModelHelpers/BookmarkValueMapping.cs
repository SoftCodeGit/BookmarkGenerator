using System;
using System.Collections.Generic;
using SoftCode.BookmarkGenerator.Common.DTO;
using Softcore.BookmarkGenerator.API.ViewModels;
using System.Linq;

namespace Softcore.BookmarkGenerator.API.ViewModelHelpers
{
    public class BookmarkValueMapping : IBookmarkValueMapping
    {
        private Dictionary<string, string> _controlTypeMap;
        public Dictionary<string, string> ControlTypeMap {
            get
            {
                if (_controlTypeMap == null)
                {
                    _controlTypeMap = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
                    {
                        {"radio", "checkbox" },
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
            1) For radio button with TRUE/FALSE, we are using checkbox, so only need a single entry (checked = true, unchecked = false)
            2) Radio => checkbox
            3) SelectSingle => dropdown
            4) Text => textbox
            5) For BookmarkOptionNumber = 'NumOption', use BookmarkOptionValue as key, and BookmarkOptionValueDesc as value
            */

            var returnList = new List<BookmarkOptionViewModelBase>();

            // pull the list of radio with True/False off first, we'll add these separately
            var radioList = bookmarkOptions
                            .Where(item => string.Compare(item.DisplayType, "radio", true) == 0)
                            .GroupBy(item => item.BookmarkOptionNumber, (key, g) => g);

            foreach(var item in bookmarkOptions.Where(item => string.Compare(item.DisplayType, "radio", true) > 0))
            {
                returnList.Add(CreateBookmarkOptionObject(item));
            }

            // now deal with radios
            foreach(var radio in radioList)
            {
                returnList.Add(CreateBookmarkOptionObject(radio.First()));
            }

            return returnList;
        }

        // I guess I can create a factory class for this
        private BookmarkOptionViewModelBase CreateBookmarkOptionObject(BookmarkOption bookmarkOption)
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
                            if (string.Compare(bookmarkOption.BookmarkOptionNumber, "NUMOPTION")==0)
                                list.Add(new KeyValuePair<string, string>(value.BookmarkOptionValue, value.BookmarkOptionValueDesc));
                            else
                                list.Add(new KeyValuePair<string, string>(value.BookmarkOptionValue, value.BookmarkOptionValue));
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
                case "radio":
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
