import { Injectable, EventEmitter } from 'angular2/core';
import { IDbLocation } from '../shared/db-location';

@Injectable()
export class DbLocationService {
    identifier: string = "dbLocation";
    
    dbLocationChanged$: EventEmitter<IDbLocation> = new EventEmitter<IDbLocation>();
    // Most likely we don't need loaded event
    //dbLocationLoaded$: EventEmitter<IDbLocation> = new EventEmitter<IDbLocation>();

    getDbLocation(): IDbLocation {
        let dbLocation: IDbLocation = JSON.parse(localStorage.getItem(this.identifier));
        return dbLocation ? dbLocation : <IDbLocation>{};
    };

    setDbLocation(dbLocation: IDbLocation): IDbLocation {
        localStorage.setItem(this.identifier, JSON.stringify(dbLocation));
        this.dbLocationChanged$.emit(dbLocation);
        return this.getDbLocation();
    }
}