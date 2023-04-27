import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit{
    menuItems: MenuItem[] = [];
    display: boolean = false;
    text: string = '';
    
    ngOnInit(): void {
        this.menuItems = [
            {
                label: 'Вернуть', icon: 'pi pi-fw pi-check'
            },
            {
                label: 'Загрузить файлы', icon: 'pi pi-fw pi-refresh'
            },
            {
                label: 'Удалить', icon: 'pi pi-fw pi-trash'
            }
        ];
    }

}
