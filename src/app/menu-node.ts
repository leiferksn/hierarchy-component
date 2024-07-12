import { MenuButton } from "./menu-button"

export interface MenuNode {
    name:string,
    expanded: boolean,
    children: MenuNode[],
    buttons: MenuButton[],
    styles: string[],
    header: boolean
}
