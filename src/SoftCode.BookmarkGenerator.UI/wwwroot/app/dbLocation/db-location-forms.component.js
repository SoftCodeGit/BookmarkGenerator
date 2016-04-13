System.register(['angular2/core', '../dbLocation/db-location.service', '../dbLocation/db-location-base.component', 'angular2/common'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, db_location_service_1, db_location_base_component_1, common_1;
    var DbLocationFormsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (db_location_service_1_1) {
                db_location_service_1 = db_location_service_1_1;
            },
            function (db_location_base_component_1_1) {
                db_location_base_component_1 = db_location_base_component_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            DbLocationFormsComponent = (function (_super) {
                __extends(DbLocationFormsComponent, _super);
                function DbLocationFormsComponent(_dbLocationService, _formBuilder) {
                    _super.call(this, _dbLocationService);
                    this._dbLocationService = _dbLocationService;
                    this._formBuilder = _formBuilder;
                }
                DbLocationFormsComponent.prototype.onSubmitClicked = function (value) {
                    if (!this.dbLocationForm.valid)
                        return;
                    this.dbLocation = this._dbLocationService.setDbLocation(JSON.parse(JSON.stringify(value)));
                    this.isEdit = !this.isEdit;
                };
                DbLocationFormsComponent.prototype.onChangeClicked = function () {
                    this.isEdit = !this.isEdit;
                };
                DbLocationFormsComponent.prototype.onDbLocationCancelClicked = function () {
                    _super.prototype.onDbLocationCancelClicked.call(this);
                    // seems there's no way to set the values of the form
                    if (this.dbLocationForm.dirty) {
                        //console.log("rebuilding form control group");
                        this.buildControlGroup();
                    }
                };
                DbLocationFormsComponent.prototype.buildControlGroup = function () {
                    this.dbLocationForm = this._formBuilder.group({
                        'serverName': [this.dbLocation.serverName, common_1.Validators.required],
                        'dbName': [this.dbLocation.dbName, common_1.Validators.required]
                    });
                };
                DbLocationFormsComponent.prototype.ngOnInit = function () {
                    _super.prototype.ngOnInit.call(this);
                    this.buildControlGroup();
                };
                ;
                DbLocationFormsComponent = __decorate([
                    core_1.Component({
                        selector: 'bm-dbLocation-forms',
                        templateUrl: 'app/dbLocation/db-location-forms.component.html',
                        directives: [common_1.FORM_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [db_location_service_1.DbLocationService, common_1.FormBuilder])
                ], DbLocationFormsComponent);
                return DbLocationFormsComponent;
            })(db_location_base_component_1.DbLocationBaseComponent);
            exports_1("DbLocationFormsComponent", DbLocationFormsComponent);
        }
    }
});
//# sourceMappingURL=C:/Users/arthur.lee/Documents/GitHub/SoftCode.BookmarkGenerator/src/SoftCode.BookmarkGenerator.UI/wwwroot/app/dbLocation/db-location-forms.component.js.map