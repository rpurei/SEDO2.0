import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TaskService } from '../../../services/task.service';
import { ITaskShort } from '../../../models/ITask';

@Component({
    selector: 'app-task-short',
    templateUrl: './task-short.component.html',
    styleUrls: ['./task-short.component.scss']
})
export class TaskShortComponent implements OnInit {
    constructor(private taskService: TaskService) {
    }
    
    loading: boolean = false;
    display: boolean = false;
    text: string = '';
    panelMenuItems: MenuItem[] = [];
    menuItems: MenuItem[] = [];
    menuItems1: MenuItem[] = [];
    tieredItems: MenuItem[] = [];
    items: MenuItem[] = [];
    tooltipItems: MenuItem[] = [];
    tasksShort: ITaskShort[] = [];
    
    ngOnInit(): void {
        this.taskService.getAllTasksShort().subscribe({
            next: value => {
                value.data.forEach((value: ITaskShort) => {
                    value.dateStart = new Date(value.dateStart);
                });
                this.tasksShort = value.data;
            }
        });
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
        // this.menuItems = [
        //     {
        //         label: 'Вернуть', icon: 'pi pi-fw pi-check'
        //     },
        //     {
        //         label: 'Загрузить файлы', icon: 'pi pi-fw pi-refresh'
        //     },
        //     {
        //         label: 'Удалить', icon: 'pi pi-fw pi-trash'
        //     }
        // ];
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
    
    sort(sort: string) {
        this.loadingFunction()
        switch (sort) {
            case 'text':

                this.tasksShort = this.tasksShort.sort((a, b) => a.title > b.title ? 1 : -1);
                break;
            case 'date':
                this.tasksShort = this.tasksShort.sort((a, b) => a.dateStart > b.dateStart ? 1 : -1);
                console.log(this.tasksShort);
        }
    }
    loadingFunction() {
        this.loading = true
        setTimeout(()=> {
            this.loading = false
        },500)
    }
}
