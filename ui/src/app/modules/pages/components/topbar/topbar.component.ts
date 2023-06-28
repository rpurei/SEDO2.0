import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from '../../../../services/layout.service';
import { MenuItem } from 'primeng/api';
import { ConfigComponent } from '../../../config/config/config.component';
import { AuthService } from '../../../../services/auth.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { LoaderService } from '../../../../services/loader.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss'],
    providers: [ConfigComponent, ProgressBarModule]
})

export class TopbarComponent implements OnInit {
    items!: MenuItem[];
    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;
    
    constructor(
        public layoutService: LayoutService,
        private configComponent: ConfigComponent,
        private authService: AuthService,
        public loaderService: LoaderService
    ) {
    }
    
    userFunctions: MenuItem[] = [];
    
    configClick(): void {
        this.configComponent.onConfigButtonClick();
    }
    
    ngOnInit(): void {
        this.userFunctions = [
            {
                label: 'Выйти', icon: 'pi pi-fw pi-check', command: () => {
                    this.authService.logout();
                }
            },
        ];
    }
}
