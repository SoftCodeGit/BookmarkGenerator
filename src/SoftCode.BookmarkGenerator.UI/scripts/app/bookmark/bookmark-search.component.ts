import { Component, OnInit, OnDestroy  } from 'angular2/core';
import { Subscription } from 'rxjs/Subscription';

import { IDbLocation } from '../shared/dbLocation/db-location';
import { DbLocationService } from '../dbLocation/db-location.service';

import {BookmarkContext} from './bookmark-context';
import {Bookmark} from './bookmark';
import {BookmarkService} from './bookmark.service';
import {BookmarkOptionValue} from '../bookmarkOption/bookmark-option-value';
import {BookmarkOptionValueChangeService} from '../bookmarkOption/bookmark-option-value-change.service';
import {BookmarkOptionListComponent} from '../bookmarkOption/bookmark-option-list.component';
import {BookmarkGenerationService} from './bookmark-generation.service';

import {IClipboardCopyCommand, ClipboardCopyCommandService } from '../shared/clipboard/clipboard-command.service';
import {ClipboardComponent} from '../shared/clipboard/clipboard.component';

import {DropDownComponent} from './bookmark-dropdown.component';
import {Grid} from './grid/grid';
import {Column} from './grid/column';

@Component({
    selector: 'bm-search',
    template: `
    <h4>{{message}}</h4>
    <div>{{errormessage}}</div>
    <div *ngIf="dbLocation && dbLocation.serverName && dbLocation.dbName">
        <h3>Generate Bookmark</h3>
        <div class="row">
            <div class="col-sm-12">
                <clipboard [hideCopyButton]="true"></clipboard>                  
            </div>

        </div>                   
        <div [hidden]="bookmarkCode!=null">
            <div class="row">
                <div class="col-sm-5">
                    <h4>Bookmark Context:</h4>
                    <my-dropdown [contexts]=bookmarkContexts (valueSelected)="displayValueSelected($event)"></my-dropdown>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-10">
                    <h4>Search:</h4>
                    <div class="form-inline">
                        <input [(ngModel)]="searchCriteria" placeholder="Search Criteria" class="form-control ctrl-width-sm"/>
                        <button (click)="search()" class="btn btn-primary">Search</button>
                    </div>
                </div>
            </div>
            <div class="row top-buffer-std">
                <div class="col-sm-12">
                    <grid name="bookmark grid" [rows]="bookmarks" [columns]="columns" (rowClicked)="getRowClicked($event)" (viewClicked)="getViewClicked($event)" (copyClicked)="onCopyClicked($event)"></grid>
                </div>
            </div>
        </div>
    </div>
    <!--<div><label-copy [bookmarkText]="bookmarkText"></label-copy></div>-->
    <div class="row top-buffer-std" *ngIf="bookmarkCode">
        <div class="col-sm-6">
            <h4>
                Bookmark Code:
                <span class="label label-default">{{bookmarkCode}}</span>
            </h4>
            <bm-form [bookmarkCode]="bookmarkCode"><img src=""></bm-form>
        </div>
    </div>
`,
    directives: [DropDownComponent, Grid, BookmarkOptionListComponent, ClipboardComponent],
    providers: [BookmarkService, BookmarkOptionValueChangeService, BookmarkGenerationService]
})
export class BookmarkSearchComponent implements OnInit, OnDestroy {
    dbLocation: IDbLocation;
    message: string;
    
    columns: Array<Column>;
    bookmarkContexts: BookmarkContext[];
    bookmarks: Bookmark[];
    searchCriteria: string = "";
    selectedBookmarkContext: string;
    errormessage: string;

    bookmarkCode: string;
    private _dbLocationChanged: Subscription;
    private _bookmarkOptionValueSelectionDone: Subscription;    

    constructor(
        private _dbLocationService: DbLocationService,
        private _bookmarkService: BookmarkService,
        private _bookmarkChangeService: BookmarkOptionValueChangeService,
        private _bookmarkGenerationService: BookmarkGenerationService,
        private _clipboardCopyCommandService: ClipboardCopyCommandService) {
        
    }

    private onDbLocationChanged(dbLocation: IDbLocation): void {
        // reset items etc - but this scenario very unlikely to happen since when we change tab the component got destroyed
        // leaving this here for now
        console.log(JSON.stringify(dbLocation));
    }

    private onOptionValueSelectionDone(message: string): void {
        this.bookmarkCode = null;
    }

    ngOnInit(): void {
        this.dbLocation = this._dbLocationService.getDbLocation();
        this.message = (this.dbLocation && this.dbLocation.dbName) ? "" : "Please designate a database location first";
        this._dbLocationChanged =
            this._dbLocationService.dbLocationChanged$.subscribe(dbLocation => this.onDbLocationChanged(dbLocation));
        this._bookmarkOptionValueSelectionDone =
            this._bookmarkChangeService.bookmarkOptionValueSelectionDone$.subscribe(message => this.onOptionValueSelectionDone(message));

        this.columns = this.getColumns();

        this.bookmarkContexts = this._bookmarkService.getContextMock();

        //TODO uncomment to call API
        //this._bookmarkService.getReportContexts()
        //    .subscribe(
        //    context => this.bookmarkContexts = context,
        //    error => this.errormessage = <any>error);
    }

    ngOnDestroy(): void {
        this._dbLocationChanged.unsubscribe();
        this._bookmarkOptionValueSelectionDone.unsubscribe();
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

    getRowClicked(row: Bookmark): void {




        //this.bookmarkText = row.BookmarkCode;

        //let _bookmarkOptionValue: BookmarkOptionValue = new BookmarkOptionValue();
        //_bookmarkOptionValue.bookmarkCode = row.BookmarkCode;

        //this._bookmarkChangeService.bookmarkOptionValueChangeBroadcast(_bookmarkOptionValue);
    }

    onCopyClicked(row: Bookmark): void {
        let bookmark = this._bookmarkGenerationService.getBookmarkText(<BookmarkOptionValue>{ bookmarkCode: row.BookmarkCode });
        this._clipboardCopyCommandService.copyCommandServiceCommenceCopy(<IClipboardCopyCommand>{ text: bookmark, executeNow: true });
    }

    getViewClicked(row: Bookmark):void {
        this.bookmarkCode = row.BookmarkCode;
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