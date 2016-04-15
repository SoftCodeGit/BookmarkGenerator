import { ControlGroup, FormBuilder, Validators} from 'angular2/common';
import { BookmarkOptionBase } from './bookmark-option-base.ts';
import { Injectable } from 'angular2/core';

@Injectable()
export class BookmarkOptionControlService {

    constructor(private _formBuilder: FormBuilder) {
    }

    toControlGroup(bookmarkOptions: BookmarkOptionBase<any>[]): ControlGroup {
        let group = {};

        bookmarkOptions.forEach(bookmarkOption => {
            // builds a property based on the key passed in
            // e.g., email: ['', Validators.required], where email is the key(id on the form) of the widget
            group[bookmarkOption.key] = bookmarkOption.required ? [bookmarkOption.value || '', Validators.required] : []
        });
        // builds the control group
        // controls are grouped so we can check, for example, the validity of the form easily
        // we can also get the values of the entire form easily as a group
        return this._formBuilder.group(group);
    }

}