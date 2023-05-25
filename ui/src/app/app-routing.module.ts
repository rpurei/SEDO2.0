import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
    {
        path: 'page',
        loadChildren: () => import('./modules/pages/pages.module').then(m => m.PagesModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'demo',
        loadChildren: () => import('./modules/demo/demo.module').then(m => m.DemoModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'error',
        loadChildren: () => import('./modules/error/error.module').then(m => m.ErrorModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'access',
        loadChildren: () => import('./modules/access/access.module').then(m => m.AccessModule),
        canActivate: [AuthGuard]
    },
    {path: '**', redirectTo: 'page/index'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
