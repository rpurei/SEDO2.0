import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { addDays, addHours, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
import { Subject } from 'rxjs';
import {
    CalendarDateFormatter,
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView,
} from 'angular-calendar';
import { DAYS_OF_WEEK, EventColor } from 'calendar-utils';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { CustomerService } from '../../../demo/service/customer.service';
import { Table } from 'primeng/table';
import { MenuItem } from 'primeng/api';
import { EventsService } from '../../../../services/api/events.service';
import { PlannerFullApiServiceConvert } from '../../../../services/data/planner-full-api-service-convert.service';

const colors: Record<string, EventColor> = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF',
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA',
    },
};

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
    filteredItems: any[] = [];
    
    constructor(private customerService: CustomerService, private apiEventService: EventsService, private planerFullApiService: PlannerFullApiServiceConvert) {
    }
    
    options: MenuItem[] = [];
    
    
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
    items1: any[] = [];
    
    ngOnInit(): void {
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
        
        
        this.items1 = [
            {label: 'Ivanov Ivan Ivanovich'},
            {label: 'Ivanov1 Ivan1 Ivanovich1'},
            {label: 'Petrov Petr Petrovich'},
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
    
    test() {
        this.apiEventService.getAllEventsShort().subscribe({next: value => {
                console.log(this.planerFullApiService.convertApiShortToCalendarEventAction(value))
            }, error: err => {
                console.log(err);
            }})
    }
    
    
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    
    filterItems(event: any) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        let query = event.query;
        
        for (let i = 0; i < this.items1.length; i++) {
            let item = this.items1[i];
            // @ts-ignore
            if (item.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(item);
            }
        }
        
        this.filteredItems = filtered;
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

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: '10:20' + ' A 3 day event',
      color: { ...colors['red'] },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: '12:15' + ' An event with no end date',
      color: { ...colors['yellow'] },
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: '13:10' + ' A long event that spans 2 months',
      color: { ...colors['blue'] },
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: '13:20' + ' A draggable and resizable event',
      color: { ...colors['yellow'] },
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];
  selectedItem1: any;
  visible: boolean = false;


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
