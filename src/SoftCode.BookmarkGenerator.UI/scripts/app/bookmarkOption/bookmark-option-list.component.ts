// Rendering the form containing the widgets of a list of options and their values.
// It needs to retreive a list of options using a service,
// after that, it needs to create a control group (form) of controls using widget-control.service.ts for each options.
// At this point, there are no UI associated with each control, so we loop over the list of options
// which have the UI meta data.  We send the form and each option to bookmark-option.component to create the option's
// widget. Each widget is binded to its corresponding control in the form using dynamically created code.  
import {Component, Input, OnInit}  from 'angular2/core';
import {ControlGroup}              from 'angular2/common';
import {BookmarkOptionDataService} from './bookmark-option-data.service';
import {BookmarkOptionControlService} from './bookmark-option-control.service';
import {BookmarkOptionComponent} from './bookmark-option.component';
import {BookmarkOptionValueChangeService} from './bookmark-option-value-change.service';
import {IBookmarkOptionValue} from './bookmark-option-value';

@Component({
    selector: 'bm-form',
    templateUrl: 'app/bookmarkOption/bookmark-option-list.component.html',
    directives: [BookmarkOptionComponent]
})
export class BookmarkOptionListComponent implements OnInit {
    
    @Input() bookmarkCode: string;
    form: ControlGroup;
    bookmarkOptions: any[];

    constructor(private _bookmarkOptionDataService: BookmarkOptionDataService,
        private _bookmarkOptionControlService: BookmarkOptionControlService,
        private _bookmarkOptionValueChangeService: BookmarkOptionValueChangeService) {
    }

    onSubmit(value: string): void{
        console.log(JSON.stringify(value));
    }

    onFormValueChanged(value: any): void {
        let formValues = JSON.parse(JSON.stringify(value))
        let bookmarkValue = {
            bookmarkCode: this.bookmarkCode,
            formValues: formValues
        };
        this._bookmarkOptionValueChangeService.bookmarkOptionValueChangeBroadcast(<IBookmarkOptionValue>bookmarkValue);
    }

    private processBookmarkOptionResult(bookmarkOptions): void {
        console.log("processBookmarkOptionResult");

        this.bookmarkOptions = bookmarkOptions;
        console.log(this.bookmarkOptions);
        // get the control group based on the list of bookmark options
        this.form = this._bookmarkOptionControlService.toControlGroup(this.bookmarkOptions);
        console.log(this.form);
        // delay 1 second before calling the form's on change handler
        this.form.valueChanges.debounceTime(1000).subscribe(form => this.onFormValueChanged(form));
    }

    ngOnInit(): void {
        // get list of bookmarkOptions
        this._bookmarkOptionDataService.getBookmarkOptions(this.bookmarkCode)
            .subscribe(bookmarkOptions => this.processBookmarkOptionResult(bookmarkOptions),
            err => console.log(err),
            () => console.log("done"));
    }
}