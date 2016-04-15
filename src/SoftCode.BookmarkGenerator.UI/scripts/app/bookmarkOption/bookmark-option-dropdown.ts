import { BookmarkOptionBase } from './bookmark-option-base';

export class DropdownBookmarkOption extends BookmarkOptionBase<string>{
    controlType = 'dropdown';
    dropdownOptions: {
        key: string, value: string
    }[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.dropdownOptions = options['dropdownOptions'] || [];
    }
}
