System.register(['angular2/core', 'rxjs/Rx', 'angular2/router', './dbLocation/db-location.service', './dbLocation/db-location-forms.component', './bookmark/bookmark-search.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, db_location_service_1, db_location_forms_component_1, bookmark_search_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {},
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (db_location_service_1_1) {
                db_location_service_1 = db_location_service_1_1;
            },
            function (db_location_forms_component_1_1) {
                db_location_forms_component_1 = db_location_forms_component_1_1;
            },
            function (bookmark_search_component_1_1) {
                bookmark_search_component_1 = bookmark_search_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_dbLocationService, _router) {
                    this._dbLocationService = _dbLocationService;
                    this._router = _router;
                    this.pageTitle = 'Bookmark Generator';
                    this.tabItems = [
                        { caption: 'Home', link: ['Home'] },
                        { caption: 'Search', link: ['Search'] },
                    ];
                }
                AppComponent.prototype.onDbLocationChanged = function (dbLocation) {
                    console.log("From app.Component: " + JSON.stringify(dbLocation));
                    this._router.navigate(['Search']);
                };
                AppComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._dbLocationService.dbLocationChanged$.subscribe(function (dbLocation) { return _this.onDbLocationChanged(dbLocation); });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'bm-app',
                        templateUrl: 'app/app.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [db_location_service_1.DbLocationService]
                    }),
                    router_1.RouteConfig([
                        { path: '/', name: 'Home', component: db_location_forms_component_1.DbLocationFormsComponent, useAsDefault: true },
                        { path: '/search', name: 'Search', component: bookmark_search_component_1.BookmarkSearchComponent }
                    ]), 
                    __metadata('design:paramtypes', [db_location_service_1.DbLocationService, router_1.Router])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=C:/Users/arthur.lee/Documents/GitHub/SoftCode.BookmarkGenerator/src/SoftCode.BookmarkGenerator.UI/wwwroot/app/app.component.js.map