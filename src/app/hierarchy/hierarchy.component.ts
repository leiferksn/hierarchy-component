import { Component } from '@angular/core';
import { MenuNode } from '../menu-node';
import { FoldButton } from '../fold-button';
import { ButtonEvent } from '../button-event';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-hierarchy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hierarchy.component.html',
  styleUrl: './hierarchy.component.scss'
})
export class HierarchyComponent {
  public nodes: MenuNode[] = []

  public showToolInput: boolean = false

  ids?: Array<string>

  private inputsSource = new Subject<string[]>();

  inputsUpdated$ = this.inputsSource.asObservable();

  constructor() {
    of(["914c66a8-8ff2-4d97-8bfc-db4ae17dd660",
      "7696b463-c438-40ef-afc7-bba8a09e8b51",
      "b2ec2da1-659f-458f-ba6e-cd74d8cbfa88",
      "7cd20478-b183-4edd-ba10-2712991825fd",
      "6764bb31-64b3-4da3-b2c3-4286f577efd8"
    ]).subscribe((ids: string[]) => {
      let carNodes: MenuNode[] = []

      ids.forEach((id: string) => {
        let toolNode = { name: id.substring(0, 8), expanded: false, children: [], header: false, buttons: [], styles: [] }
        carNodes.push(toolNode)
      })

      let a319: MenuNode = { name: "A 319 ", expanded: false, children: [], header: false, buttons: [], styles: [] }
      let a320: MenuNode = { name: "A 320 ", expanded: false, children: [], header: false, buttons: [], styles: [] }
      let jetEngine: MenuNode = { name: "Jet Engine", expanded: true, children: [a320, a319], header: false, buttons: [this.createFoldButton("Jet Engine")], styles: ["bg-red-200"] }
      let planes: MenuNode = { name: "Planes", expanded: true, children: [jetEngine], header: false, buttons: [this.createFoldButton("Planes")], styles: ["bg-slate-200"] }
      let cars: MenuNode = { name: "Cars", expanded: true, children: carNodes, header: false, buttons: [this.createFoldButton("Cars")], styles: ["bg-slate-200"] }
      let vehicles: MenuNode = { name: "Vehicles", expanded: true, children: [cars, planes], header: true, buttons: [this.createFoldButton("Vehicles")], styles: ["font-semibold", "m-0.5", "text-xs", "uppercase", "bg-emerald-100", "border", "border-slate-300"] }

      this.nodes.push(vehicles)

    })
  }



  private createFoldButton(name: string): FoldButton {
    let fb: FoldButton = new FoldButton(["bg-white"], name, false)
    fb.updateFolded(false)
    fb.event().subscribe(e => {
      this.handleButtonClickEvent(e)
    })
    return fb
  }

  private handleButtonClickEvent(event: ButtonEvent): void {
    console.debug("Event type: " + event.type + ", event name: " + event.name)
    let foundNode: MenuNode | undefined = this.lookForNodeByName(this.nodes, event.name)

    if (foundNode !== undefined) {
      foundNode.buttons.forEach(b => {
        if (b.get_name == event.name && b instanceof FoldButton) {
          foundNode!.expanded = !event.folded
          let fb = b as FoldButton
          fb.updateFolded(event.folded)
        } else {
          // no need to do anything
        }
      })
    } else {
      console.error("NODE NOT FOUND!")
    }
  }


  private lookForNodeByName(nodes: MenuNode[], name: string): MenuNode | undefined {
    let foundNode
    let i = 0
    for (i = 0; i < nodes.length; i++) {
      let node = nodes[i]
      if (this.nodeFound(node, name)) {

        return node
      } else {
        foundNode = this.lookForNodeByName(node.children, name)
      }
    }
    return foundNode
  }


  private nodeFound(node: MenuNode, name: string): boolean {
    if (node.name === name) {
      return true
    }
    return false
  }
}