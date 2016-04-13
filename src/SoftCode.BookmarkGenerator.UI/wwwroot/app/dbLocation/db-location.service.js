System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var DbLocationService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            DbLocationService = (function () {
                function DbLocationService() {
                    this.identifier = "dbLocation";
                    this.dbLocationChanged$ = new core_1.EventEmitter();
                }
                // Most likely we don't need loaded event
                //dbLocationLoaded$: EventEmitter<IDbLocation> = new EventEmitter<IDbLocation>();
                DbLocationService.prototype.getDbLocation = function () {
                    var dbLocation = JSON.parse(localStorage.getItem(this.identifier));
                    return dbLocation ? dbLocation : {};
                };
                ;
                DbLocationService.prototype.setDbLocation = function (dbLocation) {
                    localStorage.setItem(this.identifier, JSON.stringify(dbLocation));
                    this.dbLocationChanged$.emit(dbLocation);
                    return this.getDbLocation();
                };
                DbLocationService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], DbLocationService);
                return DbLocationService;
            })();
            exports_1("DbLocationService", DbLocationService);
        }
    }
});
//# sourceMappingURL=C:/Users/arthur.lee/Documents/GitHub/SoftCode.BookmarkGenerator/src/SoftCode.BookmarkGenerator.UI/wwwroot/app/dbLocation/db-location.service.js.map