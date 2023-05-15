import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Tasks1CService } from '../../../services/1C/api/tasks.service';
import { ITaskShort } from '../../../models/ITask';

@Component({
  selector: 'app-task-short',
  templateUrl: './task-short.component.html',
  styleUrls: ['./task-short.component.scss'],
})
export class TaskShortComponent implements OnInit {
  constructor(private taskService: Tasks1CService) {}
  noSortingTasks: ITaskShort[] = [];
  tasksShort: ITaskShort[] = [];
  loading: boolean = true;
  tieredItems: MenuItem[] = [];
  items: MenuItem[] = [];
  tooltipItems: MenuItem[] = [];
  sorting: string = 'default';
  search: string = '';
  display: boolean = false;
  cities: any;
  people: any;

  filterTasks(value: string | number) {
    console.log(typeof value);
    if (value === '' || value === ' ') {
      this.tasksShort = this.noSortingTasks;
    } else if (typeof value === 'string') {
      value = value.toLowerCase();
      this.tasksShort = this.tasksShort.filter((value1) => value1.title.toLowerCase().includes(value.toString()));
    }
    // else {
    //   console.log(value)
    //   this.tasksShort = this.tasksShort.filter(value1 => value1.dateStart.toString().includes(value.toString()))
    // }
  }

  getShortTasks() {
    this.loading = true;
    this.taskService.getAllTasksShort().subscribe({
      next: (value) => {
        value.data.forEach((value: ITaskShort) => {
          value.dateStart = new Date(value.dateStart);
        });
        this.tasksShort = value.data;
        this.noSortingTasks = value.data;
        this.loading = false;
      },
      error: (err) => console.error(err),
    });
  }

  ngOnInit(): void {
    this.people = [
      { name: 'Ivanov Ivan Ivanovich', date: new Date() },
      { name: 'Ivanov Ivan Ivanovich', date: new Date() },
      { name: 'Ivanov Ivan Ivanovich', date: new Date() },
      { name: 'Ivanov Ivan Ivanovich', date: new Date() },
    ];
    this.getShortTasks();
    this.tooltipItems = [
      {
        tooltipOptions: {
          tooltipLabel: 'Add',
        },
        icon: 'pi pi-pencil',
        command: () => {
          console.log('good');
        },
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Update',
        },
        icon: 'pi pi-refresh',
        command: () => {
          console.log('good');
        },
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Delete',
        },
        icon: 'pi pi-trash',
        command: () => {
          console.log('good');
        },
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Upload',
        },
        icon: 'pi pi-upload',
      },
      {
        tooltipOptions: {
          tooltipLabel: 'Angular Website',
        },
        icon: 'pi pi-external-link',
        url: 'http://angular.io',
      },
    ];
    this.items = [
      { label: 'Задача подчиненным' },
      { label: 'Приказ/распоряжение/резолюция' },
      { label: 'Протокол Комитета' },
      { label: 'Протокол РС/РВ/РЧ/БС' },
      { label: 'Прочее' },
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
            icon: 'pi pi-fw pi-list',
          },
          {
            label: 'Задачи по Протоколу Комитета',
            icon: 'pi pi-fw  pi-list',
          },
          {
            label: 'Задачи по Протоколу РС/РВ',
            icon: 'pi pi-fw pi-list',
          },
          {
            label: 'Прочие задачи',
            icon: 'pi pi-fw pi-list',
          },
        ],
      },
      {
        label: 'Контроль',
        items: [
          {
            label: 'Задачи по ОРД',
            icon: 'pi pi-fw pi-list',
          },
          {
            label: 'Задачи по Протоколу Комитета',
            icon: 'pi pi-fw pi-list',
          },
          {
            label: 'Задачи по Протоколу РС/РВ',
            icon: 'pi pi-fw pi-list',
          },
          {
            label: 'Прочие задачи',
            icon: 'pi pi-fw pi-list',
          },
        ],
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
      },
    ];
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
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
  }

  sort(sortType: string) {
    this.loadingFunction();
    switch (sortType) {
      case 'text':
        if (this.sorting === 'text') {
          this.tasksShort = this.tasksShort.sort((a, b) => (a.title < b.title ? 1 : -1));
          this.sorting = 'textBack';
        } else {
          this.tasksShort = this.tasksShort.sort((a, b) => (a.title > b.title ? 1 : -1));
          this.sorting = 'text';
        }
        break;
      case 'date':
        if (this.sorting === 'date') {
          this.tasksShort = this.tasksShort.sort((a, b) => (a.dateStart < b.dateStart ? 1 : -1));
          this.sorting = 'dateBack';
        } else {
          this.sorting = 'date';
          this.tasksShort = this.tasksShort.sort((a, b) => (a.dateStart > b.dateStart ? 1 : -1));
        }
        console.log(this.tasksShort);
        break;
    }
  }

  loadingFunction() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 200);
  }
}
