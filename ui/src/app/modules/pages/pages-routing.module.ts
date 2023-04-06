import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { IndexComponent } from "./index/index.component";

const routes: Routes = [{ path: '',
                          component: PagesComponent,
                          children: [
                            { path: 'index', component: IndexComponent }
                          ]
                        },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
