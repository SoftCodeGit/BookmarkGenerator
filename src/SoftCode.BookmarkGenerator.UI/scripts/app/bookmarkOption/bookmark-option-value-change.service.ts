import { Injectable} from 'angular2/core';
import { Subject } from 'rxjs/Subject';
import { IBookmarkOptionValue } from './bookmark-option-value';

@Injectable()
export class BookmarkOptionValueChangeService {
    private _bookmarkOptionValueChangedSource = new Subject<IBookmarkOptionValue>();
    private _bookmarkOptionValueSelectionDoneSource = new Subject<string>();

    // Do we need this?  We changed to an approach where we send a command to the clipboard directly
    bookmarkOptionValueChanged$ = this._bookmarkOptionValueChangedSource.asObservable();
    // We do need this to inform components that user is done with option selections
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