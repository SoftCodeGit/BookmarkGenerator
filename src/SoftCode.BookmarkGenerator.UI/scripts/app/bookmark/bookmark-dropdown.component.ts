import { Input, Component, Output, EventEmitter } from 'angular2/core';
import {BookmarkContext} from './bookmark-context';

@Component({
    selector: 'my-dropdown',
    template: `
    <select  [ngModel]="selectedItem"  (change)="onSelect($event.target.value)">
      <option *ngFor="#context of contexts" [value]="context.ReportContextCode">{{context.ReportContextDesc}}</option>
    </select>
    `
})

export class DropDownComponent {
    @Input() contexts: BookmarkContext[];
    @Output() valueSelected = new EventEmitter();

    selectedItem: string;

    onSelect(reportContextCode) {
        this.valueSelected.emit(reportContextCode);
    }
}