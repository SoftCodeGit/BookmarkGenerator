export class BookmarkOptionBase<T>{
    value: T;   // the type of the value returned by the control
    key: string;    // key is the id of the control
    label: string;
    required: boolean;
    order: number;  // order is the display order on the form
    controlType: string;

    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        required?: boolean,
        order?: number,
        controlType?: string
    } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
    }
}
