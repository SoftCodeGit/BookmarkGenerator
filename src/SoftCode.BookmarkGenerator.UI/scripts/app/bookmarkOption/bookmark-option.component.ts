// render a  widget representing a single item of interest
import { Component, Input } from 'angular2/core';
import { ControlGroup, Control } from 'angular2/common';
import { BookmarkOptionBase } from './bookmark-option-base';

@Component({
    selector: '<bm-option></bm-option>',
    templateUrl: 'app/bookmark/bookmark-option.component.html'
})
export class BookmarkOptionComponent {
    @Input() bookmarkOption: BookmarkOptionBase<any>;   // the object containing the meta data of the control
    @Input() form: ControlGroup;    // the entire form collection

    // method to check if control has 'required' error
    get isMissing() {
        let control = this.form.controls[this.bookmarkOption.key];
        return !control.pristine && control.hasError('required');
    }

    // method to reset value of control
    resetValue(): void {
        // note the cast to type Control which has the method updateValue
        // the base is AbstractControl which has no such method
        let control = <Control>this.form.controls[this.bookmarkOption.key];
        if (control.value)
            control.updateValue(null, { onlySelf: false, emitEvent: true});
    }

    // method to show/hide reset botton
    get showReset() {
        let control = <Control>this.form.controls[this.bookmarkOption.key];
        return control.value ? true : false;
    }
}
