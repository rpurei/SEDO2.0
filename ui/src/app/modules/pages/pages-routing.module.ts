import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { IndexComponent } from './index/index.component';
import { PlannerComponent } from './planner/planner.component';
import { TaskShortComponent } from './task-short/task-short.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {path: 'index', component: IndexComponent},
            {path: 'planner', component: PlannerComponent},
            {path: 'task', component: TaskShortComponent},
        ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
