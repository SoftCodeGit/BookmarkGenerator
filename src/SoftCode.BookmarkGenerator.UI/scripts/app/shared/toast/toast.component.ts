import {Component, OnInit, OnDestroy} from 'angular2/core';
import {Subscription}   from 'rxjs/Subscription';
import {ToasterContainerComponent, ToasterService} from 'angular2-toaster/angular2-toaster';
import {IClipboadCopyStatus, ClipboardCopyCommandService} from '../clipboard/clipboard-command.service';

@Component({
    selector: "toast",
    template: "<toaster-container ></toaster-container>",
    directives: [ToasterContainerComponent],
    providers: [ToasterService]
})
export class ToastComponent implements OnInit, OnDestroy  {
    private _clipboardCopyStatus: Subscription
    
    constructor(private _toasterService: ToasterService, private _clipboardCopyService: ClipboardCopyCommandService) {
    }

    private processClipboadCopyStatus(status: IClipboadCopyStatus): void {
        
        switch (status.status) {
            case "success":
                this._toasterService.pop("success", "That Worked!", status.message)
                break;
            case "error":
                this._toasterService.pop("error", "It Works on my Computer!", status.message);
                break;
            case "warning":
                this._toasterService.pop("warning", "WTH!", status.message);
                break;
            case "info":
                this._toasterService.pop("info", "FYI!", status.message);
                break;
        }
    }

    ngOnInit(): void {
        this._clipboardCopyStatus = this._clipboardCopyService.copyStatusNotify$.subscribe(status => this.processClipboadCopyStatus(status));
    }

    ngOnDestroy(): void {
        this._clipboardCopyStatus.unsubscribe();
    }
}