import { MenuButton } from "./menu-button"

export class FoldButton extends MenuButton {

    constructor(styles: string[], name: string, private folded: boolean) {
        super(styles, name)
        this.folded = folded
        if (folded) {
            this.icon = "v"
        } else {
            this.icon = "^"
        }
    }

    override click(): void {
        if (!this.folded) {
            console.debug("Fire folding event!")
            this.icon = "v"
            this.clickEvents$.next({ name: this.get_name, type: "fold", folded:true })
        } else {
            console.debug("Fire unfolding event!")
            this.icon = "^"
            this.clickEvents$.next({ name: this.get_name, type: "unfold", folded:false })
        }
    }

    public get get_folded() {
        return this.folded
    }

    public updateFolded(folded: boolean) {
        this.folded = folded
    }


}
