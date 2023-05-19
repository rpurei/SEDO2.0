import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {path: 'page', loadChildren: () => import('./modules/pages/pages.module').then(m => m.PagesModule)},
    {path: 'demo', loadChildren: () => import('./modules/demo/demo.module').then(m => m.DemoModule)},
    {path: 'login', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)},
    {path: '**', redirectTo: 'page/index'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
