import { Subject } from "rxjs"
import { ButtonEvent } from "./button-event"


export class MenuButton {

    protected icon?: string

    protected clickEvents$ = new Subject<ButtonEvent>()

    constructor(private styles: string[], private name: string) {
        this.styles = styles
        this.name = name

    }

    get get_name(): string {
        return this.name
    }

    get get_icon(): string | undefined {
        return this.icon
    }

    get get_styles(): string[] {
        return this.styles
    }

    public click(): void {
        console.log(this.name)
    }

    public event(): Subject<ButtonEvent> {
        return this.clickEvents$
    }

}
