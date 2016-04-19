import {Component, OnInit, Input} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {Subscription}   from 'rxjs/Subscription';

import {BookmarkOptionValue} from '../bookmarkOption/bookmark-option-value';
import {BookmarkOptionValueChangeService} from '../bookmarkOption/bookmark-option-value-change.service';
import {BookmarkService} from './bookmark.service';


@Component({
    selector: 'label-copy',
    template: `
    <div>
        <!--<label class="copy-label">{{bookmarkText}}</label>-->
        <button (click)="doCopy()" [ngClass]="copyClass">Copy</button>
        <label class=copy-label-{{bookmarkText}}><{{bookmarkText}}></label>
        <!--<button *ngIf="bookmarkText"  (click)="doCopy()" [ngClass]="copyClass">Copy</button>-->
    </div>
  `,
    directives: [NgClass],
    providers: [BookmarkService]
})

export class LabelCopyComponent implements OnInit {
    @Input() bookmarkText: string;
    //bookmarkText: string;
    copyClass: string;

    constructor(
        private _bookmarkOptionValueChangeService: BookmarkOptionValueChangeService,
        private _bookmarkService: BookmarkService
    ) { };

    ngOnInit() {
        //this._bookmarkOptionValueChangeService.bookmarkOptionValueChanged$.subscribe(optionValue => this.onBookmarkOptionValueChanged(optionValue));
    };



    onBookmarkOptionValueChanged(optionValue: BookmarkOptionValue):void {
        //this.bookmarkText = this._bookmarkService.getBookmarkText(optionValue);
    }





    doCopy():void {
        //TODO error handling

        //console.log("doCopy");
        //console.log(ev);
        window.getSelection().removeAllRanges(); //added this at begining otherwise you need to click Copy twice.

        //selector must be unique on page or else it will only return the first one it finds
        var bookmarkText = document.querySelector('.copy-label-' + this.bookmarkText + '');
        console.log(bookmarkText);

        var range = document.createRange();
        range.selectNode(bookmarkText);
        window.getSelection().addRange(range);


        var successful = document.execCommand('copy');
        //window.alert(successful);
        window.getSelection().removeAllRanges();

        this.copyClass = "copied";

        //wait one second then change the class back to empty.
        setTimeout(() => this.copyClass = "", 1000)
    }
}