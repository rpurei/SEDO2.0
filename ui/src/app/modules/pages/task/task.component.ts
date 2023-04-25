import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
    panelMenuItems: MenuItem[] = [];
    menuItems: MenuItem[] = [];
    menuItems1: MenuItem[] = [];
    tieredItems: MenuItem[] = [];
    
    ngOnInit(): void {
        this.tieredItems = [
            {
                label: 'Согласовать',
                icon: 'pi pi-fw pi-check',
            },
            {
                label: 'Исполнить',
                items: [
                    {
                        label: 'Задачи по ОРД',
                        icon: 'pi pi-fw pi-list'
                    },
                    {
                        label: 'Задачи по Протоколу Комитета',
                        icon: 'pi pi-fw  pi-list'
                    },
                    {
                        label: 'Задачи по Протоколу РС/РВ',
                        icon: 'pi pi-fw pi-list'
                    },
                    {
                        label: 'Прочие задачи',
                        icon: 'pi pi-fw pi-list'
                    },
                
                ]
            },
            {
                label: 'Контроль',
                items: [
                    {
                        label: 'Задачи по ОРД',
                        icon: 'pi pi-fw pi-list'
                    },
                    {
                        label: 'Задачи по Протоколу Комитета',
                        icon: 'pi pi-fw pi-list'
                    },
                    {
                        label: 'Задачи по Протоколу РС/РВ',
                        icon: 'pi pi-fw pi-list'
                    },
                    {
                        label: 'Прочие задачи',
                        icon: 'pi pi-fw pi-list'
                    },
    
                ]
            },
            {
                label: 'Проверить исполнение',
                icon: 'pi pi-fw pi-info-circle',
            },
            {
                label: 'Ознакомиться',
                icon: 'pi pi-fw pi-eye',
            },
            {
                label: 'Архив',
                icon: 'pi pi-fw pi-lock',
            }
        ];
        // this.panelMenuItems = [
        //     {
        //         label: 'Согласовать',
        //         icon: 'pi pi-fw pi-user-edit'
        //     },
        //     {
        //         label: 'Исполнить',
        //         icon: 'pi pi-fw pi-plus',
        //         items: [
        //             {
        //                 label: 'Задачи по ОРД',
        //                 icon: 'pi pi-fw pi-copy'
        //             },
        //             {
        //                 label: 'Задачи по Протоколу Комитета',
        //                 icon: 'pi pi-fw pi-copy'
        //             },
        //             {
        //                 label: 'Задачи по Протоколу РС/РВ',
        //                 icon: 'pi pi-fw pi-copy'
        //             },
        //             {
        //                 label: 'Прочие задачи',
        //                 icon: 'pi pi-fw pi-copy'
        //             },
        //         ]
        //     },
        //     {
        //         label: 'Контроль',
        //         icon: 'pi pi-fw pi-plus',
        //         items: [
        //             {
        //                 label: 'Задачи по ОРД',
        //                 icon: 'pi pi-fw pi-copy'
        //             },
        //             {
        //                 label: 'Задачи по Протоколу Комитета',
        //                 icon: 'pi pi-fw pi-copy'
        //             },
        //             {
        //                 label: 'Задачи по Протоколу РС/РВ',
        //                 icon: 'pi pi-fw pi-copy'
        //             },
        //             {
        //                 label: 'Прочие задачи',
        //                 icon: 'pi pi-fw pi-copy'
        //             },
        //         ]
        //     },
        //     {
        //         label: 'Проверить исполнение',
        //         icon: 'pi pi-fw pi-user-edit'
        //     },
        //     {
        //         label: 'Ознакомиться',
        //         icon: 'pi pi-fw pi-user-edit'
        //     },
        // ];
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
        this.menuItems1 = [
            {
                label: 'Отлично'
            },
            {
                label: 'Пойдет'
            },
            {
                label: 'Переделать'
            },
        ];
    }
    
}
