import { Component, Input, OnInit } from '@angular/core';
import { LayoutService } from "../../../../services/layout.service";

@Component ({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})

export class SidemenuComponent implements OnInit {
  @Input() model: any[] = [];
  constructor(public layoutService: LayoutService) { }

  ngOnInit() {

  }

}
