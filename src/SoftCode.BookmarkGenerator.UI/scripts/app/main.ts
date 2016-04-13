/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />
import { bootstrap } from 'angular2/platform/browser';
import { AppComponent } from './app.component';
import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS,
LocationStrategy,
HashLocationStrategy,
PathLocationStrategy,
APP_BASE_HREF, } from 'angular2/router';



bootstrap(AppComponent, [ROUTER_PROVIDERS,
    provide(APP_BASE_HREF, { useValue: '/' }),
    provide(LocationStrategy, { useClass: HashLocationStrategy })
]).then(success => console.log(`Bootstrap success`))
    .catch(error => console.log(error));