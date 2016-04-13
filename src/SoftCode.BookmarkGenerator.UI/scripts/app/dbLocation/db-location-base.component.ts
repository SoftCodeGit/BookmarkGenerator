import { Component, OnInit  } from 'angular2/core';
import { IDbLocation } from '../shared/db-location';
import { DbLocationService } from '../dbLocation/db-location.service'

export class DbLocationBaseComponent implements OnInit {
    protected isEdit: boolean = false;
    protected dbLocation: IDbLocation;
    protected dbLocationEdit: IDbLocation;
    protected buttonTextOptions = { SAVE: "Save", EDIT: "Change" };   // don't feel like creating another interface for this
    protected buttonText: string;

    constructor(protected _dbLocationService: DbLocationService) {
        //console.log("DbLocationService injected into base class");
    }

    onDbLocationClicked(): void {
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

    onDbLocationCancelClicked(): void {
        this.isEdit = !this.isEdit;
        this.setButtonText();
    }

    showCancelButton(): boolean {
        return this.canEdit() && !this.isEdit;
    }

    protected canEdit(): boolean {
        return this.dbLocation && this.dbLocation.dbName && this.dbLocation.serverName ? true : false;
    };

    protected setButtonText(): void {
        this.buttonText = this.isEdit ? this.buttonTextOptions.EDIT : this.buttonTextOptions.SAVE;
    };

    // Hack to clone object, where's my Angular.Clone()?
    protected cloneDbLocation<T>(objectToClone: T): T {
        return <T>JSON.parse(JSON.stringify(objectToClone)) || <T>{};
    }

    ngOnInit(): void {
        this.dbLocation = this._dbLocationService.getDbLocation();
        this.isEdit = this.canEdit();
        this.setButtonText();
        this.dbLocationEdit = this.cloneDbLocation(this.dbLocation);
    };
}