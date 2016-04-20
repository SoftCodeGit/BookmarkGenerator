import { Component, provide, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS } from 'angular2/http';
import 'rxjs/Rx';
import { RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';

import { IDbLocation } from './shared/dbLocation/db-location';
import { DbLocationService } from './dbLocation/db-location.service';
import { DbLocationFormsComponent } from './dbLocation/db-location-forms.component';
import { BookmarkSearchComponent} from './bookmark/bookmark-search.component';
import {IClipboardCopyCommand, ClipboardCopyCommandService} from './shared/clipboard/clipboard-command.service';

import {ToastComponent} from './shared/toast/toast.component';

@Component({
    selector: 'bm-app',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES, ToastComponent],
    //TODO: uncomment registering of services when they are available
    providers: [
        DbLocationService
        , HTTP_PROVIDERS
        , ClipboardCopyCommandService
        //, BookmarkOptionDataService
        //, BookmarkOptionControlService
        //, BookmarkOptionValueChangeService
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
        //console.log("From app.Component: " + JSON.stringify(dbLocation));
        this._router.navigate(['Bookmark']);
    }

    ngOnInit(): void {

    }

}