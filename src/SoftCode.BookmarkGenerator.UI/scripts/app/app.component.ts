import { Component, provide, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS } from 'angular2/http';
import 'rxjs/Rx';
import { RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';

import { DbLocationService } from './dbLocation/db-location.service';
import { DbLocationFormsComponent } from './dbLocation/db-location-forms.component';
import { BookmarkSearchComponent} from './bookmark/bookmark-search.component';

import {IDbLocation, IClipboardCopyCommand, ClipboardCopyCommandService, ToastComponent, LoadingIconComponent, LoadingIconService} from './shared/shared';

@Component({
    selector: 'bm-app',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES, ToastComponent, LoadingIconComponent],
    providers: [
        DbLocationService
        , HTTP_PROVIDERS
        , ClipboardCopyCommandService
        , LoadingIconService
    ]
})

@RouteConfig([
        { path: '/', name: 'Home', component: DbLocationFormsComponent, useAsDefault: true },
        { path: '/bookmark', name: 'Bookmark', component: BookmarkSearchComponent }
    ])

export class AppComponent implements OnInit {
    
    public tabItems = [
        { caption: 'Home', link: ['Home'] },
        { caption: 'Bookmark', link: ['Bookmark'] },
    ];

    constructor(private _router: Router    ) {
        
    }
    
    private onDbLocationChanged(dbLocation: IDbLocation): void {
        this._router.navigate(['Bookmark']);
    }

    ngOnInit(): void {

    }

}