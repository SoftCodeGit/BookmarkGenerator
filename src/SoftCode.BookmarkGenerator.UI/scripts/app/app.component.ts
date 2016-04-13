import { Component, provide, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS } from 'angular2/http';
import 'rxjs/Rx';
import { RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';

import { IDbLocation } from './shared/db-location';
import { DbLocationService } from './dbLocation/db-location.service';
import { DbLocationFormsComponent } from './dbLocation/db-location-forms.component';
import { BookmarkSearchComponent} from './bookmark/bookmark-search.component';

@Component({
    selector: 'bm-app',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    //TODO: uncomment registering of services when they are available
    providers: [
        DbLocationService
        , HTTP_PROVIDERS
        //, BookmarkOptionDataService
        //, BookmarkOptionControlService
        //, BookmarkOptionValueChangeService
    ]
})

@RouteConfig([
        { path: '/', name: 'Home', component: DbLocationFormsComponent, useAsDefault: true },
        { path: '/search', name: 'Search', component: BookmarkSearchComponent }
    ])

export class AppComponent implements OnInit {
    
    public tabItems = [
        { caption: 'Home', link: ['Home'] },
        { caption: 'Search', link: ['Search'] },
    ];

    constructor(private _dbLocationService: DbLocationService,
                private _router: Router    ) {
        
    }
    
    private onDbLocationChanged(dbLocation: IDbLocation): void {
        console.log("From app.Component: " + JSON.stringify(dbLocation));
        this._router.navigate(['Search']);
    }

    ngOnInit(): void {
        this._dbLocationService.dbLocationChanged$.subscribe(dbLocation => this.onDbLocationChanged(dbLocation));
    }

}