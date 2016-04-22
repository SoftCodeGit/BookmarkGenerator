import {Component, OnDestroy, OnInit} from 'angular2/core';
import { Subscription } from 'rxjs/Rx';

import { ILoadingState, LoadingIconService  } from './loading-icon.service';

@Component({
    selector: 'loading-icon',
    template: `
        <div [style.display]="display">
            <img src="image/loading.gif" class="loading-icon" />
        </div>
`
})
export class LoadingIconComponent implements OnInit, OnDestroy {
    display: string = "none";

    private _loadingIconStateChanged: Subscription;
    
    constructor(private _loadingIconService: LoadingIconService) { }

    private onLoadingStateChanged(iconState: ILoadingState): void {
        this.display = iconState.show ? "block" : "none";
    }
    
    ngOnInit(): void {
        this._loadingIconStateChanged = this._loadingIconService.loadingIconState$.subscribe(iconState => this.onLoadingStateChanged(iconState));
    }
    
    ngOnDestroy(): void {
        this._loadingIconStateChanged.unsubscribe();
    } 

}