import {Component, OnInit, OnDestroy, Input} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {Subscription}   from 'rxjs/Subscription';
import {IClipboardCopyCommand, IClipboadCopyStatus, ClipboardCopyCommandService} from './clipboard-command.service';


@Component({
    selector: 'clipboard',
    template: `
    <div>
        <label for="copytarget">Bookmark:</label>
        <input id="copytarget" value="{{bookmarkText}}" class="ctrl-width-std transparent-ctrl" placeholder="No bookmark created yet"/>
        <button (click)="doCopy()" [ngClass]="copyClass" class="btn btn-default" data-copytarget="#copytarget" [style]="getButtonStyle()">Copy</button>
    </div>
  `,
    directives: [NgClass]
})
export class ClipboardComponent implements OnInit, OnDestroy {
    private _clipboardCopyCommandIncoming: Subscription;    
    bookmarkText: string;
    copyClass: string;
    @Input() hideCopyButton: boolean;

    constructor(private _clipboardCopyCommandService: ClipboardCopyCommandService) {
    }

    private executeCommand(command: IClipboardCopyCommand): void {
        this.bookmarkText = command.text;
        if (command.executeNow) {
            this.doCopy(command.text);
        }
    }

    getButtonStyle(): string {
        return this.hideCopyButton ? "display: none;" : "display: inline;";
    }

    doCopy(value: any): void {
        //TODO error handling

        let targetInput = <HTMLInputElement>document.querySelector('#copytarget');
        targetInput.value = value;
        targetInput.select();

        let status: string;
        try {
            let successful = document.execCommand('copy');
            // TODO: we need a way to convey success to the user, something like a toast
            console.log(successful);
            status = successful ? "success" : "warning";
        }
        catch (err) {
            status = "error";
        }

        this.statusNotification(value, status);
    }

    private statusNotification(message: string, status: string): void {
        let statusObject: IClipboadCopyStatus;

        statusObject = { status: status, message: `${status} copying ${message} to the clipboard!`, title: null};
        
        this._clipboardCopyCommandService.copyStatusPerformNotification(statusObject);
    }

    // Note: this works, using an invisible text area, but attaching and detaching an element each time
    // is kind of expensive, leaving this here for reference only
    private copyTextToClipboard(text: any) {
        var textArea = <HTMLTextAreaElement>document.createElement("textarea");

        //
        // *** This styling is an extra step which is likely not required. ***
        //
        // Why is it here? To ensure:
        // 1. the element is able to have focus and selection.
        // 2. if element was to flash render it has minimal visual impact.
        // 3. less flakyness with selection and copying which **might** occur if
        //    the textarea element is not visible.
        //
        // The likelihood is the element won't even render, not even a flash,
        // so some of these are just precautions. However in IE the element
        // is visible whilst the popup box asking the user for permission for
        // the web page to copy to the clipboard.
        //

        // Place in top-left corner of screen regardless of scroll position.
        textArea.style.position = 'fixed';
        textArea.style.top = "0";
        textArea.style.left = "0";

        // Ensure it has a small width and height. Setting to 1px / 1em
        // doesn't work as this gives a negative w/h on some browsers.
        textArea.style.width = '2em';
        textArea.style.height = '2em';

        // We don't need padding, reducing the size if it does flash render.
        textArea.style.padding = "0";

        // Clean up any borders.
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';

        // Avoid flash of white box if rendered for any reason.
        textArea.style.background = 'transparent';


        textArea.value = text;

        document.body.appendChild(textArea);

        textArea.select();

        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }

        document.body.removeChild(textArea);
}

    ngOnInit(): void {
        this._clipboardCopyCommandIncoming =
            this._clipboardCopyCommandService.copyCommandIncoming$.subscribe(command => this.executeCommand(command));
    }

    ngOnDestroy(): void {
        this._clipboardCopyCommandIncoming.unsubscribe();
    }
    
}