import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
    display: boolean = false;
    text: string = '';
    panelMenuItems: MenuItem[] = [];
    menuItems: MenuItem[] = [];
    menuItems1: MenuItem[] = [];
    tieredItems: MenuItem[] = [];
    items: MenuItem[] = [];
    tooltipItems: MenuItem[] = [];
    
    ngOnInit(): void {
        this.tooltipItems = [
            {
                tooltipOptions: {
                    tooltipLabel: 'Add'
                },
                icon: 'pi pi-pencil',
                command: () => {
                    console.log('good');
                }
            },
            {
                tooltipOptions: {
                    tooltipLabel: 'Update'
                },
                icon: 'pi pi-refresh',
                command: () => {
                    console.log('good');
                }
            },
            {
                tooltipOptions: {
                    tooltipLabel: 'Delete'
                },
                icon: 'pi pi-trash',
                command: () => {
                    console.log('good');
                }
            },
            {
                tooltipOptions: {
                    tooltipLabel: 'Upload'
                },
                icon: 'pi pi-upload'
            },
            {
                tooltipOptions: {
                    tooltipLabel: 'Angular Website'
                },
                icon: 'pi pi-external-link',
                url: 'http://angular.io'
            }
        ];
        this.items = [
            {label: 'Задача подчиненным'},
            {label: 'Приказ/распоряжение/резолюция'},
            {label: 'Протокол Комитета'},
            {label: 'Протокол РС/РВ/РЧ/БС'},
            {label: 'Прочее'},
        ];
        
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
