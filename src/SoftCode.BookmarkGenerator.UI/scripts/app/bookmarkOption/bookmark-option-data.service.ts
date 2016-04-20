import {Injectable} from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {BookmarkOptionBase} from './bookmark-option-base';
import {DropdownBookmarkOption} from './bookmark-option-dropdown';
import {TextboxBookmarkOption} from './bookmark-option-textbox';
import {CheckboxBookmarkOption} from './bookmark-option-checkbox';
import {DbLocationService } from '../dbLocation/db-location.service';

@Injectable()
export class BookmarkOptionDataService {
    // TODO: move this to a CONFIG object
    private _url: string = "http://localhost:51985/api/bookmark/BookmarkOptions/";

    constructor(private _dbLocationService: DbLocationService, private _http: Http) {

    }
    
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

        let db = this._dbLocationService.getDbLocation();
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });
        let url = `${this._url}${bookMarkCode}?${this._dbLocationService.getDbQueryString()}`;

        return this._http.get(url)
            .map(this.transformData)
            .catch(this.handleError);

    }

    private transformData(res: Response): BookmarkOptionBase<any>[]{
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Failed response status: ' + res.status);
        }
        // TODO find out if we need to cast the objects before returning
        // I think it works now without casting since we are transpiling to ES5 which has no custom types
        let returnList: BookmarkOptionBase<any>[] = [];
        let body = res.json();

        for (var n = 0; n < body.length; n++) {
            let object = <BookmarkOptionBase<any>>body[n];
            switch (object.controlType) {
                case "textbox":
                    returnList.push(
                        <TextboxBookmarkOption>object
                    );
                    break;
                case "dropdown":
                    returnList.push(
                        <DropdownBookmarkOption>object
                    );
                    break;
                case "checkbox":
                    returnList.push(<CheckboxBookmarkOption>object);
                    break;
            }
        };

        return returnList;
    }

    private handleError(error: any): any {
        let errMsg = error.message || 'Server error';
        // TODO - log err to server
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
