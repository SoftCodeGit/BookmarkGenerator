import {Injectable} from 'angular2/core';
import {Observable}     from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {IBookmarkOptionValue, BookmarkOptionValuePair} from '../bookmarkOption/bookmark-option-value';


@Injectable()
export class BookmarkGenerationService {

    getBookmarkText(bookmarkValue: IBookmarkOptionValue): string {
        let output: string = "";

        if (bookmarkValue && bookmarkValue.bookmarkCode) {
            output = "<" + bookmarkValue.bookmarkCode;
            
            //build syntax based optional form values 
            if (bookmarkValue.formValues) {

                let optionalText: string = "";
                let numOption: string = "";

                for (var n = 0; n < bookmarkValue.formValues.length; n++) {

                    let item: BookmarkOptionValuePair = bookmarkValue.formValues[n];
                    console.log(item);
                    //make sure value is populated
                    if (item.value && item.value.length > 0) {

                        if (item.key.toUpperCase() == "NUMOPTION") {
                            numOption = item.value;
                        }
                        else {
                            if (optionalText.length > 0)
                                optionalText += "~";

                            optionalText += item.key + ":" + item.value;
                        }
                    }
                }

                if (numOption.length > 0)
                    output += "_NUM:" + numOption;

                if (optionalText.length > 0)
                    output += "_OPT_" + optionalText;
            }

            output += ">";
        }


        return output;
    }
}