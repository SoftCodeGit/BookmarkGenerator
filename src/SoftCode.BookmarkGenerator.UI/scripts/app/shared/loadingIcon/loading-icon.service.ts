import { Injectable } from 'angular2/core';
import { Observable, Subject } from 'rxjs/Rx';

export interface ILoadingState {
    show: boolean
}

@Injectable()
export class LoadingIconService {
    private _loadingIconSource: Subject<ILoadingState> = new Subject<ILoadingState>();

    // expose subject to subscribers (observer)
    loadingIconState$ = this._loadingIconSource.asObservable();

    show() {
        this._loadingIconSource.next(<ILoadingState>{ show: true });
    }

    hide() {
        this._loadingIconSource.next(<ILoadingState>{ show: false });
    }
}