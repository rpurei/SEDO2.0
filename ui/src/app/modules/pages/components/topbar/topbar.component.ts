import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from "../../../../services/layout.service";
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

export class TopbarComponent {
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService) { }
}
