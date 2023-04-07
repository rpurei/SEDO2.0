import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    templateUrl: './buttondemo.component.html'
})
export class ButtonDemoComponent implements OnInit {

    items: MenuItem[] = [];

    loading = [false, false, false, false];

    ngOnInit() {
        this.items = [
            { label: 'Обноваить', icon: 'pi pi-refresh' },
            { label: 'Удалить', icon: 'pi pi-times' },
            { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' },
            { separator: true },
            { label: 'Установки', icon: 'pi pi-cog' }
        ];
    }

    load(index: number) {
        this.loading[index] = true;
        setTimeout(() => this.loading[index] = false, 1000);
    }

}
