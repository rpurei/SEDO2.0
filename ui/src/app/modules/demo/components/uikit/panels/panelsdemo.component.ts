import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    templateUrl: './panelsdemo.component.html'
})
export class PanelsDemoComponent implements OnInit {

    items: MenuItem[] = [];
    cardMenu: MenuItem[] = [];

    ngOnInit() {
        this.items = [
            { label: 'Angular.io', icon: 'pi pi-external-link', url: 'http://angular.io' },
            { label: 'Темы', icon: 'pi pi-bookmark', routerLink: ['/theming'] }
        ];

        this.cardMenu = [
            {
                label: 'Сохранить', icon: 'pi pi-fw pi-check'
            },
            {
                label: 'Обновить', icon: 'pi pi-fw pi-refresh'
            },
            {
                label: 'Удалить', icon: 'pi pi-fw pi-trash'
            },
        ];
    }

}
