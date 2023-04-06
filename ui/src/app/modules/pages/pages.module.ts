import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { IndexComponent } from './index/index.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { MenuitemComponent } from './components/menuitem/menuitem.component';
import {RippleModule} from "primeng/ripple";
import { FooterComponent } from './components/footer/footer.component';
import {ConfigModule} from "../config/config.module";


@NgModule({
    declarations: [
        PagesComponent,
        IndexComponent,
        TopbarComponent,
        SidebarComponent,
        SidemenuComponent,
        MenuitemComponent,
        FooterComponent
    ],
  exports: [
    TopbarComponent,
    SidebarComponent,
    FooterComponent
  ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        RippleModule,
        ConfigModule
    ]
})
export class PagesModule { }
