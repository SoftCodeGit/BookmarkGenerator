import { Component, OnInit  } from 'angular2/core';
import { IDbLocation } from '../shared/db-location';
import { DbLocationService } from '../dbLocation/db-location.service';

import {BookmarkContext} from './bookmark-context';
import {Bookmark} from './bookmark';
import {BookmarkService} from './bookmark.service';
import {BookmarkOptionValue} from '../bookmarkOption/bookmark-option-value';
import {BookmarkOptionValueChangeService} from '../bookmarkOption/bookmark-option-value-change.service';

import {LabelCopyComponent} from './label-copy.component';

import {DropDownComponent} from './bookmark-dropdown.component';
import {Grid} from './grid/grid';
import {Column} from './grid/column';


/* 
* This is just a temp component put together to show the nav bar works.
*/
@Component({
    selector: 'bm-search',
    template: `
    {{message}}
    <div>{{errormessage}}</div>
    <div class="container">
        <div class="row">
          <div class="col-sm-2">Bookmark Context</div>
          <div class="col-sm-10"><my-dropdown [contexts]=bookmarkContexts (valueSelected)="displayValueSelected($event)"></my-dropdown></div>
        </div>
        <div class="row">
          <div class="col-sm-2">Search</div>
          <div class="col-sm-10"><input [(ngModel)]="searchCriteria" placeholder="search criteria"/></div>
        </div>
        <div class="row">
          <div class="col-sm-2"></div>
          <div class="col-sm-10"><button (click)="search()">Search</button></div>
        </div>
    </div>
    <div><label-copy></label-copy></div>
    <p>      
    </p>
    <grid name="bookmark grid" [rows]="bookmarks" [columns]="columns" (rowClicked)="getRowClicked($event)"  (viewClicked)="getViewClicked($event)"></grid>
`,
    directives: [DropDownComponent, Grid, LabelCopyComponent],
    providers: [BookmarkService, BookmarkOptionValueChangeService]
})
export class BookmarkSearchComponent implements OnInit {
    dbLocation: IDbLocation;
    message: string;
    
    columns: Array<Column>;
    bookmarkContexts: BookmarkContext[];
    bookmarks: Bookmark[];
    searchCriteria: string = "";
    selectedBookmarkContext: string;
    errormessage: string;
    

    constructor(
        private _dbLocationService: DbLocationService,
        private _bookmarkService: BookmarkService,
        private _bookmarkChangeService: BookmarkOptionValueChangeService) {
        
    }

    private onDbLocationChanged(dbLocation: IDbLocation): void {
        // reset items etc
        console.log(JSON.stringify(dbLocation));
    }

    ngOnInit(): void {
        this.dbLocation = this._dbLocationService.getDbLocation();
        this.message = (this.dbLocation && this.dbLocation.dbName) ? JSON.stringify(this.dbLocation) : "Please designate a database location first";
        this._dbLocationService.dbLocationChanged$.subscribe(dbLocation => this.onDbLocationChanged(dbLocation));

        this.columns = this.getColumns();

        this.bookmarkContexts = this._bookmarkService.getContextMock();

        //TODO uncomment to call API
        //this._bookmarkService.getReportContexts()
        //    .subscribe(
        //    context => this.bookmarkContexts = context,
        //    error => this.errormessage = <any>error);
    }

    displayValueSelected(ev: string):void {
        this.selectedBookmarkContext = ev;
    }

    search():void {
        this.bookmarks = this._bookmarkService.getBookmarksMock(this.selectedBookmarkContext, this.searchCriteria);
        
        //TODO uncomment to call API
        //this._bookmarkService.searchBookmarks(this.selectedBookmarkContext, this.searchCriteria)
        //    .subscribe(
        //    context => this.bookmarks = context,
        //    error => this.errormessage = <any>error);
    }

    getRowClicked(row:Bookmark):void {
        let _bookmarkOptionValue: BookmarkOptionValue = new BookmarkOptionValue();
        _bookmarkOptionValue.bookmarkCode = row.BookmarkCode;

        this._bookmarkChangeService.bookmarkOptionValueChangeBroadcast(_bookmarkOptionValue);
    }

    getViewClicked(row: Bookmark):void {
 
        //TODO navigate or show modal               
    }

    getColumns(): Array<Column> {
        return [
            new Column('BookmarkCode', 'Bookmark Code'),
            new Column('ReportContextCode', 'Context'),
            new Column('BookmarkDesc', 'Description'),
            new Column('HasBookmarkOptions', 'Options')
        ];
    }


}