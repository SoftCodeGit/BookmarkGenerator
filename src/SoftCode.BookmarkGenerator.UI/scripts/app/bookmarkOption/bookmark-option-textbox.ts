import { BookmarkOptionBase } from './bookmark-option-base';

export class TextboxBookmarkOption extends BookmarkOptionBase<string>{
    controlType = 'textbox';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'];
    }
}

