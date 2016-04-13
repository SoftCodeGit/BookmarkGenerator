import {Component, Input, OnInit, Output, EventEmitter} from 'angular2/core';
import {Column} from './column';
import {Sorter} from './sorter';

@Component({
    selector: 'grid',
    templateUrl: './app/grid/grid-ui.html'
})

export class Grid implements OnInit {
    @Input() rows: Array<any>;
    @Input() columns: Array<any>;
    @Input() name: string;

    @Output() rowClicked = new EventEmitter();
    @Output() viewClicked = new EventEmitter();

    sorter = new Sorter();

    sort(key) {
        this.sorter.sort(key, this.rows);
    }

    ngOnInit() {
        console.log(this.name);
    }

    onRowClicked(row: any) {
        this.rowClicked.emit(row);
    }

    onViewClicked(row: any) {
        this.viewClicked.emit(row);
    }
}