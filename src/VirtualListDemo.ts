import MailItem from "./MailItem";
import * as fgui from "fairygui-three";

export default class VirtualListDemo {
    private _view: fgui.GComponent;
    private _list: fgui.GList;

    public constructor() {
        fgui.UIPackage.loadPackage("assets/UI/VirtualList").then(this.onUILoaded.bind(this));
    }

    onUILoaded() {
        fgui.UIObjectFactory.setExtension("ui://VirtualList/mailItem", MailItem);

        this._view = fgui.UIPackage.createObject("VirtualList", "Main").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);

        this._view.getChild("n6").onClick(() => { this._list.addSelection(500, true); });
        this._view.getChild("n7").onClick(() => { this._list.scrollPane.scrollTop(); });
        this._view.getChild("n8").onClick(() => { this._list.scrollPane.scrollBottom(); });

        this._list = <fgui.GList>this._view.getChild("mailList");
        this._list.setVirtual();

        this._list.itemRenderer = this.renderListItem.bind(this);
        this._list.numItems = 1000;
    }

    private renderListItem(index: number, obj: fgui.GObject): void {
        var item: MailItem = <MailItem>obj;
        item.setFetched(index % 3 == 0);
        item.setRead(index % 2 == 0);
        item.setTime("5 Nov 2015 16:24:33");
        item.title = index + " Mail title here";
    }
}

