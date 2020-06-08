import * as fgui from "fairygui-three";

export class TestWin extends fgui.Window {

    public constructor() {
        super();
    }

    protected onInit(): void {
        this.contentPane = fgui.UIPackage.createObject("ModalWaiting", "TestWin").asCom;
        this.contentPane.getChild("n1").onClick(this.onClickStart, this);
    }

    private onClickStart(): void {
        this.showModalWait();
        fgui.GTween.delayedCall(3).onComplete(() => { this.closeModalWait(); }, this);
    }
}


export class WindowA extends fgui.Window {
    public constructor() {
        super();
    }

    protected onInit(): void {
        this.contentPane = fgui.UIPackage.createObject("Basics", "WindowA").asCom;
        this.center();
    }

    protected onShown(): void {
        var list: fgui.GList = <fgui.GList>this.contentPane.getChild("n6");
        list.removeChildrenToPool();

        for (var i: number = 0; i < 6; i++) {
            var item: fgui.GButton = <fgui.GButton>list.addItemFromPool();
            item.title = "" + i;
            item.icon = fgui.UIPackage.getItemURL("Basics", "r4");
        }
    }
}

export class WindowB extends fgui.Window {
    public constructor() {
        super();
    }

    protected onInit(): void {
        this.contentPane = fgui.UIPackage.createObject("Basics", "WindowB").asCom;
        this.center();

        this.setPivot(0.5, 0.5);
    }

    protected doShowAnimation(): void {
        this.setScale(0.1, 0.1);
        fgui.GTween.to2(0.1, 0.1, 1, 1, 0.3)
            .setTarget(this, this.setScale)
            .setEase(fgui.EaseType.QuadOut)
            .onComplete(this.onShown, this);
    }

    protected doHideAnimation(): void {
        fgui.GTween.to2(1, 1, 0.1, 0.1, 0.3)
            .setTarget(this, this.setScale)
            .setEase(fgui.EaseType.QuadOut)
            .onComplete(this.hideImmediately, this);
    }

    protected onShown(): void {
        this.contentPane.getTransition("t1").play();
    }

    protected onHide(): void {
        this.contentPane.getTransition("t1").stop();
    }
}
