// Rendering the form containing the widgets of a list of options and their values.
// It needs to retreive a list of options using a service,
// after that, it needs to create a control group (form) of controls using widget-control.service.ts for each options.
// At this point, there are no UI associated with each control, so we loop over the list of options
// which have the UI meta data.  We send the form and each option to bookmark-option.component to create the option's
// widget. Each widget is binded to its corresponding control in the form using dynamically created code.  
import {Component, Input, OnInit, OnChanges, SimpleChange}  from 'angular2/core';
import {ControlGroup}              from 'angular2/common';
import {BookmarkOptionDataService} from './bookmark-option-data.service';
import {BookmarkOptionControlService} from './bookmark-option-control.service';
import {BookmarkOptionComponent} from './bookmark-option.component';
import {BookmarkOptionValueChangeService} from './bookmark-option-value-change.service';
import {IBookmarkOptionValue} from './bookmark-option-value';
import {BookmarkGenerationService} from '../bookmark/bookmark-generation.service';
import {ClipboardCopyCommandService, IClipboardCopyCommand, IActionStatus} from '../shared/shared';
import {ToasterContainerComponent, ToasterService} from 'angular2-toaster/angular2-toaster';

@Component({
    selector: 'bm-form',
    templateUrl: 'app/bookmarkOption/bookmark-option-list.component.html',
    directives: [BookmarkOptionComponent],
    providers: [BookmarkOptionControlService, BookmarkOptionDataService]
})
export class BookmarkOptionListComponent implements OnInit, OnChanges {
    
    @Input() bookmarkCode: string;
    form: ControlGroup = new ControlGroup({});
    bookmarkOptions: any[];

    constructor(private _bookmarkOptionDataService: BookmarkOptionDataService,
        private _bookmarkOptionControlService: BookmarkOptionControlService,
        private _bookmarkOptionValueChangeService: BookmarkOptionValueChangeService,
        private _bookmarkGenerationService: BookmarkGenerationService,
        private _clipboadCopyCommandService: ClipboardCopyCommandService,
        private _toasterService: ToasterService    ) {
    }

    onSubmit(value: string): void{
        console.log(JSON.stringify(value));
    }

    onBackClicked() {
        // reset the clipboard since we are done
        this._clipboadCopyCommandService.copyCommandServiceCommenceCopy(<IClipboardCopyCommand>{ text: "", executeNow: false })
        // inform listener that we are done with the selection so that we can reset the state
        this._bookmarkOptionValueChangeService.bookmarkOptionValueSelectionDoneBroadcast("Done");
    }

    onCopyClicked() {
        this.processFormValueChanged(this.form.value, true);
    }

    private processFormValueChanged(value: any, copyToClipboard: boolean = false): void {
        // TODO - put form value transformation in a service
        let keyValues = [];
        if (value) {
            let keys = Object.keys(value)
         
            keys.forEach(key => {
                keyValues.push({ key: key, value: value[key] });
            });
        }

        let bookmarkValue = {
            bookmarkCode: this.bookmarkCode,
            formValues: keyValues
        };
        let bookmark = this._bookmarkGenerationService.getBookmarkText(<IBookmarkOptionValue>bookmarkValue);
        // executeNow = false => do not auto copy, just update the clipboard control with the bookmark
        this._clipboadCopyCommandService.copyCommandServiceCommenceCopy(<IClipboardCopyCommand>{ text: bookmark, executeNow: copyToClipboard });
    }

    private processBookmarkOptionResult(bookmarkOptions): void {
        
        this.bookmarkOptions = bookmarkOptions;

        // get the control group based on the list of bookmark options
        this.form = this._bookmarkOptionControlService.toControlGroup(this.bookmarkOptions);

        // delay 1 second before calling the form's on change handler
        this.form.valueChanges.debounceTime(1000).subscribe(form => this.processFormValueChanged(form));

        // this call just set the bookmark to the bookmark code with no options in the clipboard, it is just for display
        this.processFormValueChanged(null);
    }

    private getBookmarkOptions() {
        // get list of bookmarkOptions
        this._bookmarkOptionDataService.getBookmarkOptions(this.bookmarkCode)
            .subscribe(bookmarkOptions => this.processBookmarkOptionResult(bookmarkOptions),
            err => this.processError(err),
            () => console.log("done"));
    }

    private processError(err: any): void {
        console.log(err);
        setTimeout(() => 
            this._toasterService.pop("warning", "WTH!", err),
            700);
        this.processFormValueChanged(null);
    }

    // listen in on change, and only go and get the data when bookmarkCode has been populated
    ngOnChanges(changes: { [bookmarkCode: string]: SimpleChange }) {
        if (this.bookmarkCode)
            this.getBookmarkOptions();
    }

    ngOnInit(): void {

    }
}