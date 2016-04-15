export interface IBookmarkOptionValue {
    bookmarkCode: string;
    formValues: BookmarkOptionValuePair[];
}

export class BookmarkOptionValue implements IBookmarkOptionValue {
    bookmarkCode: string;
    formValues: BookmarkOptionValuePair[];

    constructor() {
        this.formValues = [];
    }
}

export class BookmarkOptionValuePair {
    key: string;
    value: string;
}
