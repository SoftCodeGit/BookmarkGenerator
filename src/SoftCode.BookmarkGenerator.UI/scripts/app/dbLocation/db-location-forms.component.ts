import { Component, OnInit  } from 'angular2/core';
import { IDbLocation } from '../shared/dbLocation/db-location';
import { DbLocationService } from '../dbLocation/db-location.service'
import { DbLocationBaseComponent } from '../dbLocation/db-location-base.component';
import {
    FORM_DIRECTIVES,
    FormBuilder,
    ControlGroup,
    Validators
} from 'angular2/common';

@Component({
    selector: 'bm-dbLocation-forms',
    templateUrl: 'app/dbLocation/db-location-forms.component.html',
    directives: [FORM_DIRECTIVES]
})
export class DbLocationFormsComponent extends DbLocationBaseComponent implements OnInit {
    dbLocationForm: ControlGroup;
    
    constructor(protected _dbLocationService: DbLocationService, private _formBuilder: FormBuilder) {
        super(_dbLocationService);
    }

    protected onSubmitClicked(value: string): void {
        if (!this.dbLocationForm.valid)
            return;
        this.dbLocation = this._dbLocationService.setDbLocation(<IDbLocation>JSON.parse(JSON.stringify(value)));
        this.isEdit = !this.isEdit;
    }

    onChangeClicked(): void {
        this.isEdit = !this.isEdit;
    }

    onDbLocationCancelClicked(): void {
        super.onDbLocationCancelClicked();      
        // seems there's no way to set the values of the form
        if (this.dbLocationForm.dirty) {
            //console.log("rebuilding form control group");
            this.buildControlGroup();
        }
    }

    private buildControlGroup() {
        this.dbLocationForm = this._formBuilder.group(
            {
                'serverName': [this.dbLocation.serverName, Validators.required],
                'dbName': [this.dbLocation.dbName, Validators.required]
            }
        );        
    }

    ngOnInit(): void {
        super.ngOnInit();        
        this.buildControlGroup();
    };

}