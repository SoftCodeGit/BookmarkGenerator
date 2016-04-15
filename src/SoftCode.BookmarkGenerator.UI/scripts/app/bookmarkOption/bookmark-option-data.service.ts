import {Injectable} from 'angular2/core';
import {Http, Response, Headers, RequestOptions, Jsonp} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {BookmarkOptionBase} from './bookmark-option-base';
import {DropdownBookmarkOption} from './bookmark-option-dropdown';
import {TextboxBookmarkOption} from './bookmark-option-textbox';
import {CheckboxBookmarkOption} from './bookmark-option-checkbox';
import {DbLocationService } from '../dbLocation/db-location.service';

@Injectable()
export class BookmarkOptionDataService {
    
    private _url: string = "http://localhost:51985/api/bookmark/BookmarkOptions/";

    constructor(private _jsonp: Jsonp, private _dbLocationService: DbLocationService, private _http: Http) {

    }
    // Todo: get it from api, and make it asynch    
    getBookmarkOptionsMock(bookMarkCode: string): Observable<BookmarkOptionBase<any>[]> {

        let bookmarkOptions: BookmarkOptionBase<any>[] = [
            
            new DropdownBookmarkOption({
                key: 'TYPE',
                label: 'TYPE',
                dropdownOptions: [
                    { key: 'TOTAL', value: 'TOTAL' },
                    { key: 'BILLINGBALANCE', value: 'BILLINGBALANCE' },
                    { key: 'DEBTORBALANCE', value: 'DEBTORBALANCE' },
                    { key: 'BILLINGRECEIPTS', value: 'BILLINGRECEIPTS' },
                    { key: 'DEBTORRECEIPTS', value: 'DEBTORRECEIPTS' },
                    { key: 'BILLINGTOTAL', value: 'BILLINGTOTAL' },
                    { key: 'BILLINGTOTALPLUSADJ', value: 'BILLINGTOTALPLUSADJ' },
                    { key: 'DEBTORTOTAL', value: 'DEBTORTOTAL' },
                    { key: 'DEBTORTOTALPLUSADJ', value: 'DEBTORTOTALPLUSADJ' }
                ],
                order: 3
            }),

            new DropdownBookmarkOption({
                key: 'OUTPUT',
                label: 'OUTPUT',
                dropdownOptions: [
                    { key: 'TOTAL', value: 'TOTAL' },
                    { key: 'TEXTCR', value: 'TEXTCR' },
                    { key: 'TEXT', value: 'TEXT' },
                    { key: 'TABLE', value: 'TABLE' },
                    { key: 'TABLENOTOTAL', value: 'TABLENOTOTAL' }
                ],
                order: 6
            }),

            new TextboxBookmarkOption({
                key: 'FEE',
                label: 'FEE',
                order: 7,
                required: false
            }),

            new CheckboxBookmarkOption({
                key: 'STATISTICAL',
                label: 'STATISTICAL',
                order: 2                
            }),

            new CheckboxBookmarkOption({
                key: 'SHOWTOTAL',
                label: 'SHOWTOTAL',
                order: 4
            }),

            new CheckboxBookmarkOption({
                key: 'JUDGMENTFEE',
                label: 'JUDGMENTFEE',
                order: 5
            }),

            new DropdownBookmarkOption({
                key: 'IB',
                label: 'IB',
                dropdownOptions: [
                    { key: 'P', value: 'P' },
                    { key: 'I', value: 'I' }
                ],
                order: 1
            }),

            new DropdownBookmarkOption({
                key: 'NUMOPTION',
                label: 'Date Output Format Selection',
                dropdownOptions: [
                    { key: '2', value: 'Long Date' },
                    { key: '3', value: 'Year' },
                    { key: '4', value: 'Month Number' },
                    { key: '5', value: 'Day Number' },
                    { key: '6', value: 'Month Name' },
                    { key: '7', value: 'Day Name' },
                    { key: '8', value: 'Month Name Abbreviated' },
                    { key: '9', value: 'Day Name Abbreviated' },
                    { key: '10', value: 'Day with Ordinal Suffix' },
                    { key: '11', value: 'Month Name Day Number, Year ex. January 14, 2010' }
                ],
                order: 8
            }),
        ];

        return Observable.of(bookmarkOptions.sort((a, b) => a.order - b.order));
    };

    getBookmarkOptions(bookMarkCode: string): Observable<BookmarkOptionBase<any>[]> {
        let bookmarkOptions: Observable<BookmarkOptionBase<any>[]>;

        let body = JSON.stringify(this._dbLocationService.getDbLocation()); 
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        bookmarkOptions = this._http.post(this._url + bookMarkCode, body, options)
            .map(this.transformData)
            .catch(this.handleError);

        return bookmarkOptions;

    }

    private transformData(res: Response): BookmarkOptionBase<any>[]{
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Failed response status: ' + res.status);
        }

        let body = res.json();
        console.log(body);

        return null;
    }

    private handleError(error: any): any {
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
