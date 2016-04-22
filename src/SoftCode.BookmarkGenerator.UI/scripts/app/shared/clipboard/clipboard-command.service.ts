import {Component, OnInit, Injectable} from 'angular2/core';
import {Subject}   from 'rxjs/Subject';
import {IActionStatus} from '../shared';

export interface IClipboardCopyCommand {
    text: string;
    executeNow: boolean;
}

@Injectable()
export class ClipboardCopyCommandService {
    private _copyCommandServiceSource: Subject<IClipboardCopyCommand> = new Subject<IClipboardCopyCommand>();
    private _copyCommandServiceStatusSource: Subject<IActionStatus> = new Subject<IActionStatus>();

    copyCommandIncoming$ = this._copyCommandServiceSource.asObservable();

    copyCommandServiceCommenceCopy(value: IClipboardCopyCommand): void {
        this._copyCommandServiceSource.next(value);
    }

    copyStatusNotify$ = this._copyCommandServiceStatusSource.asObservable();

    copyStatusPerformNotification(value: IActionStatus): void {
        this._copyCommandServiceStatusSource.next(value);
    }
}