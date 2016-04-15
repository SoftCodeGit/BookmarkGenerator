import { BookmarkOptionBase } from './bookmark-option-base';

export class RadioBookmarkOption extends BookmarkOptionBase<string> {
    controlType = 'radio';
    radioOptions: {
        key: string, value: string
    }[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.radioOptions = options['radioOptions'] || [];
    }
}