import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

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
import { PlannerBlockComponent } from './planners/planner-block/planner-block.component';
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
import { EventCardComponent } from './planners/planner-block/event-card/event-card.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CountryService } from '../demo/service/country.service';
import { TabMenuModule } from 'primeng/tabmenu';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { StyleClassModule } from 'primeng/styleclass';
import { TaskShortComponent } from './task-short/task-short.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ChipModule } from 'primeng/chip';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { SpeedDialModule } from 'primeng/speeddial';
import { SkeletonModule } from 'primeng/skeleton';
import { EditorModule } from 'primeng/editor';
import { TaskComponent } from './task-short/task/task.component';
import {
    PlannerCalendarFullScreenComponent
} from './planners/planner-calendar-full-screen/planner-calendar-full-screen.component';
import { CalendarModule } from 'primeng/calendar';
import { CalendarModule as CalendarModulePlaner, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import localeRU from '@angular/common/locales/ru-MD';
import { AlertService } from '../../services/alert/alert.service';
import { KeyFilterModule } from 'primeng/keyfilter';
import { EventDetailsComponent } from './planners/planner-calendar-full-screen/event-details/event-details.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { SidebarModule } from 'primeng/sidebar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ImageModule } from 'primeng/image';
import { ChartModule } from 'primeng/chart';
import { DragDropModule } from 'primeng/dragdrop';
import { PanelModule } from 'primeng/panel';
import { PhonebookComponent } from './components/widets/widget-phonebook/phonebook.component';
import { EventChartComponent } from './components/widets/event-chart/event-chart.component';
import { WeatherComponent } from './components/widets/weather/weather.component';
import { PlanerComponent } from './components/widets/planer/planer.component';
import { WeatherDatePipe } from './components/widets/weather/weather-date.pipe';

registerLocaleData(localeRU);

@NgModule({
    declarations: [
        PagesComponent,
        IndexComponent,
        TopbarComponent,
        SidebarComponent,
        SidemenuComponent,
        MenuitemComponent,
        FooterComponent,
        PlannerBlockComponent,
        EventCardComponent,
        TaskShortComponent,
        TaskComponent,
        PlannerCalendarFullScreenComponent,
        EventDetailsComponent,
        PhonebookComponent,
        EventChartComponent,
        WeatherComponent,
        PlanerComponent,
        WeatherDatePipe
    ],
    exports: [TopbarComponent, SidebarComponent, FooterComponent],
    imports: [
        CommonModule,
        PagesRoutingModule,
        RippleModule,
        ConfigModule,
        CalendarModule,
        CalendarModulePlaner.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
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
        CalendarModule,
        KeyFilterModule,
        ConfirmPopupModule,
        SidebarModule,
        ProgressSpinnerModule,
        ImageModule,
        ChartModule,
        DragDropModule,
        PanelModule,
    ],
    providers: [
        NodeService,
        CustomerService,
        CountryService,
        MessageService,
        AlertService,
        ProgressBarModule,
        {
            provide: LOCALE_ID,
            useValue: 'ru-MD'
        },
        ConfirmationService
    ],
})
export class PagesModule {}
