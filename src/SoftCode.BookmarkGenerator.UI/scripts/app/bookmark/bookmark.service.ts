import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {BookmarkContext}     from './bookmark-context';
import {Bookmark} from './bookmark';
import {BookmarkOptionValue} from '../bookmarkOption/bookmark-option-value';
import {BookmarkOptionValuePair} from '../bookmarkOption/bookmark-option-value';
import {DbLocationService} from '../dbLocation/db-location.service';

import {CONTEXTS, BOOKMARKS}     from './bookmark.service.mock';

@Injectable() 
export class BookmarkService {
    constructor(private http: Http, private _DbLocationService: DbLocationService) { }

    private _Url = 'http://localhost:51989/api/Bookmark/';  // URL to web api



    getContextMock() {
        return CONTEXTS;
    }

    getReportContexts() {
        return this.http.get(this._Url + "BookmarkReportContext?" + this._DbLocationService.getDbQueryString())
            .map(res => <BookmarkContext[]>res.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    searchBookmarks(reportContextCode: string, searchCriteria: string) {
        var _url: string = this._Url + "SearchBookmarks?" + this._DbLocationService.getDbQueryString() + "&reportContextCode=" + reportContextCode + "&searchCriteria=" + searchCriteria;

        return this.http.get(_url, [])
            .map(res => <Bookmark[]>res.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    getBookmarksMock(reportContextCode: string, searchCriteria: string) {
        return BOOKMARKS;
    }


    private handleError(error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


    getBookmarkText(bookmarkValue: BookmarkOptionValue): string {
        let output: string = "";

        if (bookmarkValue && bookmarkValue.bookmarkCode) {
            output = "<" + bookmarkValue.bookmarkCode;
            
            //build syntax based optional form values 
            if (bookmarkValue.formValues) {

                let optionalText: string = "";
                let numOption: string = "";

                for (var n = 0; n < bookmarkValue.formValues.length; n++) {

                    let item: BookmarkOptionValuePair = bookmarkValue.formValues[n];

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