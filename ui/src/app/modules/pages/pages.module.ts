import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { IndexComponent } from './index/index.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { MenuitemComponent } from './components/menuitem/menuitem.component';
import { RippleModule } from 'primeng/ripple';
import { FooterComponent } from './components/footer/footer.component';
import { ConfigModule } from '../config/config.module';
import { PlannerComponent } from './planner/planner.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TreeTableModule } from 'primeng/treetable';
import { NodeService } from '../demo/service/node.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';
import { CustomerService } from '../demo/service/customer.service';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { EventCardComponent } from './planner/event-card/event-card.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CountryService } from '../demo/service/country.service';
import { TabMenuModule } from 'primeng/tabmenu';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { StyleClassModule } from 'primeng/styleclass';
import { TaskComponent } from './task/task.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ChipModule } from 'primeng/chip';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { SpeedDialModule } from 'primeng/speeddial';
import { SkeletonModule } from 'primeng/skeleton';
import { EditorModule } from 'primeng/editor';

@NgModule({
  declarations: [
    PagesComponent,
    IndexComponent,
    TopbarComponent,
    SidebarComponent,
    SidemenuComponent,
    MenuitemComponent,
    FooterComponent,
    PlannerComponent,
    EventCardComponent,
    TaskComponent,
  ],
  exports: [TopbarComponent, SidebarComponent, FooterComponent],
    imports: [
        CommonModule,
        PagesRoutingModule,
        RippleModule,
        ConfigModule,
        CalendarModule,
        FormsModule,
        DividerModule,
        AccordionModule,
        TableModule,
        TranslateModule,
        ToggleButtonModule,
        TreeTableModule,
        MultiSelectModule,
        DropdownModule,
        SliderModule,
        ProgressBarModule,
        InputTextModule,
        SplitButtonModule,
        AvatarModule,
        DialogModule,
        InputTextareaModule,
        AutoCompleteModule,
        TabMenuModule,
        FileUploadModule,
        BadgeModule,
        StyleClassModule,
        PanelMenuModule,
        ChipModule,
        MenuModule,
        MenubarModule,
        TabViewModule,
        ToastModule,
        SpeedDialModule,
        SkeletonModule,
        EditorModule,
    ],
  providers: [NodeService, CustomerService, CountryService, MessageService],
})
export class PagesModule {}
