import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './demo.component';
import { NotfoundComponent } from "./components/notfound/notfound.component";

const routes: Routes = [{ path: '',
                          component: DemoComponent,
                          children: [
                                      { path: '', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                                      { path: 'uikit', loadChildren: () => import('./components/uikit/uikit.module').then(m => m.UIkitModule) },
                                      { path: 'utilities', loadChildren: () => import('./components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                                      { path: 'documentation', loadChildren: () => import('./components/documentation/documentation.module').then(m => m.DocumentationModule) },
                                      { path: 'blocks', loadChildren: () => import('./components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                                      { path: 'pages', loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule) },

                          ] },
                         { path: 'landing', loadChildren: () => import('./components/landing/landing.module').then(m => m.LandingModule) },
                         { path: 'notfound', component: NotfoundComponent },
                         { path: 'auth/login', loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule) },
                         { path: 'auth/error', loadChildren: () => import('./components/auth/error/error.module').then(m => m.ErrorModule) },
                         { path: 'auth/access', loadChildren: () => import('./components/auth/access/access.module').then(m => m.AccessModule) },
                        ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
