import { Component, Input, OnInit } from '@angular/core';
import { LayoutService } from '../../../../services/layout.service';
import { LoaderService } from '../../../../services/loader.service';

@Component({
    selector: 'app-sidemenu',
    templateUrl: './sidemenu.component.html',
    styleUrls: ['./sidemenu.component.scss']
})

export class SidemenuComponent implements OnInit {
    @Input() model: any[] = [];
    
    constructor(
        public layoutService: LayoutService,
        public loaderService: LoaderService
    ) {
    }
    
    ngOnInit() {
    }
    
}
