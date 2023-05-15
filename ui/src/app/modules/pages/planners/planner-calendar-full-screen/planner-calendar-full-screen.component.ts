import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import {
    CalendarDateFormatter,
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView,
} from 'angular-calendar';
import { DAYS_OF_WEEK } from 'calendar-utils';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { CustomerService } from '../../../demo/service/customer.service';
import { Table } from 'primeng/table';
import { MenuItem } from 'primeng/api';
import { PlannerFullApiServiceConvert } from '../../../../services/1C/api/convert/planner-full-api-convert-1c.service';
import { EventsService } from '../../../../services/events.service';
import { AlertService } from '../../../../services/alert/alert.service';
import { RoomsService } from '../../../../services/rooms.service';
import { IRoom } from '../../../../models/room';

@Component({
    selector: 'app-planner-calendar-full-screen',
    templateUrl: './planner-calendar-full-screen.component.html',
    providers: [
        {
            provide: CalendarDateFormatter,
            useClass: CustomDateFormatter,
        },
    ],
    styleUrls: ['./planner-calendar-full-screen.component.scss'],
})
export class PlannerCalendarFullScreenComponent implements OnInit {
    
    constructor(
        private customerService: CustomerService,
        private apiEventService: EventsService,
        private planerFullApiService: PlannerFullApiServiceConvert,
        private alertService: AlertService,
        private roomsService: RoomsService
    ) {
    }
    
    options: MenuItem[] = [];
    selectRoom: IRoom = {id: '', name: 'Все помещения'};
    rooms: IRoom[] = [];
    filteredRooms: IRoom[] = [];
    events: CalendarEvent[] = [];
    allEvents: CalendarEvent[] = []
    
    
    nowDate: Date = new Date();
    @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any> | undefined;
    display: boolean = false;
    loading: boolean = false;
    view: CalendarView = CalendarView.Month;
    CalendarView = CalendarView;
    viewDate: Date = new Date();
    locale: string = 'ru-MD';
    nowMonth: Date = new Date();
    refresh = new Subject<void>();
    activeDayIsOpen: boolean = true;
    weekStartsOn = DAYS_OF_WEEK.MONDAY;
    eventDetail: any;
    testInfo: any;
    countries: any[] = [];
    filteredCountries: any;
    selectedCountryAdvanced: any[] = [];
    cities: any;
    activeItem: any;
    people!: any[]; // TODO: создать интерфейс
    uploadedFiles: any[] = [];
    visibleModification: boolean = false;
    endLoading: boolean = false;
    isChange: boolean = false;
    selectedItem: any;
    items: any[] = [];
    filteredItems: any;
    selectItem: any;
    
    test(a?: any) {
        console.log('good');
        console.log(a);
    }
    
    filteredEventsForRooms(room: IRoom) {
        this.events = room.name === 'Все помещения' ? this.allEvents : this.allEvents.filter(event => event.meta === room.name);
    }
    
    filterRooms(event: any) {
        this.filteredRooms = this.roomsService.filterRooms(this.rooms, event);
    }
    
    ngOnInit(): void {
        this.roomsService.getAllRooms().subscribe({
            next: value => {
                this.rooms = value;
                this.rooms.unshift(this.selectRoom);
            }
        });
        this.apiEventService.getAllEventsShort().subscribe({
            next: value => {
                if (value.length === 0) {
                    this.alertService.error('Ошибка. Обратитесь в поддержку');
                } else {
                    this.events = value;
                    this.allEvents = value
                    this.alertService.success('ok');
                }
            }
        });
        this.options = [
            {
                label: 'Все события', command: () => {
                    console.log('Все события');
                }
            },
            {
                label: 'Обновить страницу', command: () => {
                    console.log('Обновить страницу');
                }
            }
        ];
        

        this.cities = [
            {name: 'Переговорная Помещение ДИТ (виртуальное)', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'},
        ];
        
        this.items = [
            {label: 'Участники', icon: 'pi pi-fw pi-user'},
            {label: 'Информация к событию', icon: 'pi pi-fw pi-info-circle'},
            {label: 'Оценка', icon: 'pi pi-fw pi-dollar'},
            {label: 'Протокол', icon: 'pi pi-fw pi-file'},
        ];
        this.activeItem = this.items[0];
    }
    
    
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    
    
    filterCountry(event: any) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.countries.length; i++) {
            const country = this.countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
        
        this.filteredCountries = filtered;
    }
    
    filterItems(event: any) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.countries.length; i++) {
            const country = this.countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
        
        this.filteredCountries = filtered;
    }

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  showEventDetails() {
    this.customerService.getEventsDetail().then((eventDetails) => {
      this.eventDetail = eventDetails;
      this.endLoading = true;
      this.display = true;
      // this.events.forEach((customer) => (customer.end = new Date(customer.end)));
    });
  }



  showDetails() {
    this.display = true;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen) || events.length === 0);
      this.viewDate = date;
    }
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.showDetails();
    console.log('я тут');
    this.showEventDetails();
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  onActiveItemChange(event: any) {
    this.activeItem = event;
    console.log(this.activeItem);
  }

  onUpload(event: any) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
  
  
}
