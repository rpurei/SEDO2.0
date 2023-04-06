import { Component, ElementRef, Input } from '@angular/core';
import { LayoutService } from "../../../../services/layout.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() defaultMenu: any[] = [];

  constructor(public layoutService: LayoutService, public el: ElementRef) { }
}

