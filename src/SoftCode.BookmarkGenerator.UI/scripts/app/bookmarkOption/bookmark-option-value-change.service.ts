import { Injectable} from 'angular2/core';
import { Subject } from 'rxjs/Subject';
import { IBookmarkOptionValue } from './bookmark-option-value';

@Injectable()
export class BookmarkOptionValueChangeService {
    private _bookmarkOptionValueChangedSource = new Subject<IBookmarkOptionValue>();
    private _bookmarkOptionValueSelectionDoneSource = new Subject<string>();

    bookmarkOptionValueChanged$ = this._bookmarkOptionValueChangedSource.asObservable();
    bookmarkOptionValueSelectionDone$ = this._bookmarkOptionValueSelectionDoneSource.asObservable();

    // Fire this guy when the form values changed
    bookmarkOptionValueChangeBroadcast(value: IBookmarkOptionValue ): void {
        this._bookmarkOptionValueChangedSource.next(value);
    }

    // Fire this guy when we are done with option value selection
    bookmarkOptionValueSelectionDoneBroadcast(value: string): void {
        this._bookmarkOptionValueSelectionDoneSource.next(value);
    }
}