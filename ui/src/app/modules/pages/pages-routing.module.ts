import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { IndexComponent } from './index/index.component';
import { TaskShortComponent } from './task-short/task-short.component';
import { PlannerCalendarFullScreenComponent } from './planners/planner-calendar-full-screen/planner-calendar-full-screen.component';
import { PlannerBlockComponent } from './planners/planner-block/planner-block.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'index', component: IndexComponent },
      { path: 'planner', component: PlannerCalendarFullScreenComponent },
      { path: 'plannerOld', component: PlannerBlockComponent },
      { path: 'task', component: TaskShortComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
