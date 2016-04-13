import { Component, OnInit  } from 'angular2/core';
import { IDbLocation } from '../shared/db-location';
import { DbLocationService } from '../dbLocation/db-location.service';

/* 
* This is just a temp component put together to show the nav bar works.
*/
@Component({
    selector: 'bm-search',
    template: `
        <bm-search>{{message}}</bm-search>
        this is a test
`
})
export class BookmarkSearchComponent implements OnInit {
    dbLocation: IDbLocation;
    message: string = "hello";

    

    constructor(private _dbLocationService: DbLocationService) {
        
    }

    private onDbLocationChanged(dbLocation: IDbLocation): void {
        // reset items etc
        console.log(JSON.stringify(dbLocation));
    }

    ngOnInit(): void {
        this.dbLocation = this._dbLocationService.getDbLocation();
        this.message = (this.dbLocation && this.dbLocation.dbName) ? JSON.stringify(this.dbLocation) : "Please designate a database location first";
        this._dbLocationService.dbLocationChanged$.subscribe(dbLocation => this.onDbLocationChanged(dbLocation));
    }
}