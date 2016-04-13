System.register([], function(exports_1) {
    var DbLocationBaseComponent;
    return {
        setters:[],
        execute: function() {
            DbLocationBaseComponent = (function () {
                function DbLocationBaseComponent(_dbLocationService) {
                    this._dbLocationService = _dbLocationService;
                    this.isEdit = false;
                    this.buttonTextOptions = { SAVE: "Save", EDIT: "Change" }; // don't feel like creating another interface for this
                    //console.log("DbLocationService injected into base class");
                }
                DbLocationBaseComponent.prototype.onDbLocationClicked = function () {
                    if (this.buttonText === this.buttonTextOptions.SAVE) {
                        this.dbLocation = this._dbLocationService.setDbLocation(this.dbLocationEdit);
                    }
                    else {
                        // Clone the orginal version for binding in case user cancels
                        this.dbLocationEdit = this.cloneDbLocation(this.dbLocation);
                    }
                    this.isEdit = !this.isEdit;
                    this.setButtonText();
                };
                ;
                DbLocationBaseComponent.prototype.onDbLocationCancelClicked = function () {
                    this.isEdit = !this.isEdit;
                    this.setButtonText();
                };
                DbLocationBaseComponent.prototype.showCancelButton = function () {
                    return this.canEdit() && !this.isEdit;
                };
                DbLocationBaseComponent.prototype.canEdit = function () {
                    return this.dbLocation && this.dbLocation.dbName && this.dbLocation.serverName ? true : false;
                };
                ;
                DbLocationBaseComponent.prototype.setButtonText = function () {
                    this.buttonText = this.isEdit ? this.buttonTextOptions.EDIT : this.buttonTextOptions.SAVE;
                };
                ;
                // Hack to clone object, where's my Angular.Clone()?
                DbLocationBaseComponent.prototype.cloneDbLocation = function (objectToClone) {
                    return JSON.parse(JSON.stringify(objectToClone)) || {};
                };
                DbLocationBaseComponent.prototype.ngOnInit = function () {
                    this.dbLocation = this._dbLocationService.getDbLocation();
                    this.isEdit = this.canEdit();
                    this.setButtonText();
                    this.dbLocationEdit = this.cloneDbLocation(this.dbLocation);
                };
                ;
                return DbLocationBaseComponent;
            })();
            exports_1("DbLocationBaseComponent", DbLocationBaseComponent);
        }
    }
});
//# sourceMappingURL=C:/Users/arthur.lee/Documents/GitHub/SoftCode.BookmarkGenerator/src/SoftCode.BookmarkGenerator.UI/wwwroot/app/dbLocation/db-location-base.component.js.map