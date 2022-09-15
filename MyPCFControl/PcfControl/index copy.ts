import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { HelloWorld, IProps } from "./HelloWorld";
import * as React from "react";

export class PcfControl implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private notifyOutputChanged: () => void;
    private _x: number;
    private _y: number;
    private _h: number;
    private _v: number;
    private _notifyOutputChanged: () => void;
    private props: IProps = { hitems:22, vitems:31, x: 0, y: 0, horizontal: 0, vertical: 0, onChange: this.notifyChange.bind(this) };

    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.props.hitems = Number(context.parameters.HItems.raw);
        this.props.vitems = Number(context.parameters.VItems.raw);
        console.log("param h:",Number(context.parameters.HItems.raw));
        console.log("param v:",Number(context.parameters.VItems.raw));
    }

    notifyChange(x: number, y: number, h: number, v: number) {
        this._x = x;
        this._y = y;
        this._h = h;
        this._v = v;
        this.notifyOutputChanged();
    }
    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        this._x = 0;
        this._y = 0;
        this._h = 0;
        this._v = 0;
        this.props.x = this._x;
        this.props.y = this._y;
        this.props.horizontal = this._h;
        this.props.vertical = this._v;
        this.props.hitems = Number(context.parameters.HItems.raw);
        this.props.vitems = Number(context.parameters.VItems.raw);
        console.log("update view");
        console.log("param h:",context.parameters.HItems.raw);
        console.log("param v:",context.parameters.VItems.raw);
        return React.createElement(
            HelloWorld, this.props
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return { XPosition: this._x, YPosition: this._y, HPosition: this._h, VPosition: this._v };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }


}
