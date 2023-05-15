import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ITask } from '../../../../models/ITask';
import { Tasks1CService } from '../../../../services/1C/api/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  constructor(private taskService: Tasks1CService) {}

  menuItems: MenuItem[] = [];
  display: boolean = false;
  text: string = '';
  task: ITask[] = [];
  loading: boolean = false; //TODO: Изменить загрузку

  showFullTask() {
    this.loading = true;
    this.taskService.getTasksById('1').subscribe({
      next: (value) => {
        this.task = value.data;
        this.loading = false;
      },
    });
  }

  ngOnInit(): void {
    this.task = [];
    this.menuItems = [
      {
        label: 'Вернуть',
        icon: 'pi pi-fw pi-check',
      },
      {
        label: 'Загрузить файлы',
        icon: 'pi pi-fw pi-refresh',
      },
      {
        label: 'Удалить',
        icon: 'pi pi-fw pi-trash',
      },
    ];
  }
}
