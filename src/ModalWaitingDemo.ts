import { TestWin } from "./TestWin";
import * as fgui from "fairygui-three";

export default class ModalWaitingDemo {
    private _view: fgui.GComponent;
    private _testWin: TestWin;

    public constructor() {
        fgui.UIConfig.globalModalWaiting = "ui://ModalWaiting/GlobalModalWaiting";
        fgui.UIConfig.windowModalWaiting = "ui://ModalWaiting/WindowModalWaiting";

        fgui.UIPackage.loadPackage("assets/UI/ModalWaiting").then(this.onUILoaded.bind(this));
    }

    onUILoaded() {
        this._view = fgui.UIPackage.createObject("ModalWaiting", "Main").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);

        this._testWin = new TestWin();
        this._testWin.center();
        this._view.getChild("n0").onClick(function (): void { this._testWin.show(); }, this);

        fgui.GRoot.inst.showModalWait();
        fgui.Timers.add(3000, 1, () => { fgui.GRoot.inst.closeModalWait(); });
    }
}