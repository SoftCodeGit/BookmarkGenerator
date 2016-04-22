import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {BookmarkContext}     from './bookmark-context';
import {Bookmark} from './bookmark';
import {BookmarkOptionValue} from '../bookmarkOption/bookmark-option-value';
import {BookmarkOptionValuePair} from '../bookmarkOption/bookmark-option-value';
import {DbLocationService} from '../dbLocation/db-location.service';

import {CONTEXTS, BOOKMARKS}     from './bookmark.service.mock';
import {LoadingIconService, CONFIG} from '../shared/shared';

@Injectable() 
export class BookmarkService {
    constructor(private http: Http, private _DbLocationService: DbLocationService, private _loadingIconService: LoadingIconService) { }

    private _Url = CONFIG.baseUrls.bookmark;  // URL to web api

    getContextMock() {
        return CONTEXTS;
    }

    getReportContexts() {
        this._loadingIconService.show();
        return this.http.get(this._Url + "BookmarkReportContext?" + this._DbLocationService.getDbQueryString())
            .map(res => <BookmarkContext[]>res.json())
            .do(data => console.log(data))
            .catch(this.handleError)
            .finally(() => this._loadingIconService.hide());

    }

    searchBookmarks(reportContextCode: string, searchCriteria: string) {
        var _url: string = this._Url + "SearchBookmarks?" + this._DbLocationService.getDbQueryString() + "&reportContextCode=" + reportContextCode + "&searchCriteria=" + searchCriteria;
        this._loadingIconService.show();
        return this.http.get(_url, [])
            .map(res => <Bookmark[]>res.json())
            .do(data => console.log(data))
            .catch(this.handleError)
            .finally(() => this._loadingIconService.hide());
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

}