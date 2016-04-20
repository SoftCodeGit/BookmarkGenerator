import {Component, OnInit, Injectable} from 'angular2/core';
import {Subject}   from 'rxjs/Subject';

export interface IClipboardCopyCommand {
    text: string;
    executeNow: boolean;
}

export interface IClipboadCopyStatus {
    title: string;
    message: string;
    status: string;
}

@Injectable()
export class ClipboardCopyCommandService {
    private _copyCommandServiceSource: Subject<IClipboardCopyCommand> = new Subject<IClipboardCopyCommand>();
    private _copyCommandServiceStatusSource: Subject<IClipboadCopyStatus> = new Subject<IClipboadCopyStatus>();

    copyCommandIncoming$ = this._copyCommandServiceSource.asObservable();

    copyCommandServiceCommenceCopy(value: IClipboardCopyCommand): void {
        this._copyCommandServiceSource.next(value);
    }

    copyStatusNotify$ = this._copyCommandServiceStatusSource.asObservable();

    copyStatusPerformNotification(value: IClipboadCopyStatus): void {
        this._copyCommandServiceStatusSource.next(value);
    }
}