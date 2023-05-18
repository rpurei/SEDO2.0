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
import { EventApiServiceConvert } from '../../../../services/1C/api/convert/planner-full-api-convert-1c.service';
import { EventsService } from '../../../../services/events.service';
import { AlertService } from '../../../../services/alert/alert.service';
import { RoomsService } from '../../../../services/rooms.service';
import { IRoom } from '../../../../models/IRoom';
import { UsersService } from '../../../../services/users.service';
import { IUserDetail } from '../../../../models/IUser';
import { IEventDetails } from '../../../../models/IEvent';

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
    @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any> | undefined;
    
    constructor(
        private customerService: CustomerService,
        private apiEventService: EventsService,
        private eventApiServiceConvert: EventApiServiceConvert,
        private alertService: AlertService,
        private roomsService: RoomsService,
        private userService: UsersService
    ) {
    }
    
    options: MenuItem[] = [];
    selectRoom: IRoom = {id: '', name: 'Все помещения'};
    rooms: IRoom[] = [];
    filteredRooms: IRoom[] = [];
    events: CalendarEvent[] = [];
    allEvents: CalendarEvent[] = [];
    users: IUserDetail[] = [];
    filteredUsers: IUserDetail[] = [];
    selectUser!: IUserDetail;
    activeDayIsOpen: boolean = true;
    nowDate: Date = new Date();
    display: boolean = false;
    view: CalendarView = CalendarView.Month;
    CalendarView = CalendarView;
    viewDate: Date = new Date();
    locale: string = 'ru-MD';
    refresh = new Subject<void>();
    weekStartsOn = DAYS_OF_WEEK.MONDAY;
    
    
    eventDetail!: IEventDetails;
    filteredCountries: any;
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
    modalData!: {
        action: string;
        event: CalendarEvent;
    };
    
    
    test(a?: any) {
        console.log('дата окончания');
    }
    
    filteredEventsForRooms(room: IRoom) {
        this.events = room.name === 'Все помещения' ? this.allEvents : this.allEvents.filter(event => event.meta === room.name);
    }
    
    filterRooms(event: any) {
        this.filteredRooms = this.roomsService.filterRooms(this.rooms, event);
    }
    
    filterUsers(event: any) {
        this.filteredUsers = this.userService.filterUsers(this.users, event);
    }
    
    getEventFroUser(selectUser: IUserDetail) {
        this.apiEventService.getUserEventsShort(selectUser.id).subscribe(value => {
            console.log(value);
        })
    }
    
    
    ngOnInit() {
        this.userService.getAllUsersDetail().subscribe({
            next: value => {
                this.users = value;
                console.log(value);
            }, error: err => {
                this.alertService.errorApi(err);
            }
        });
        
        this.roomsService.getAllRooms().subscribe({
            next: value => {
                this.rooms.push(this.selectRoom);
                this.rooms = this.rooms.concat(value);
            }, error: err => {
                this.alertService.errorApi(err);
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
        this.items = [
            {label: 'Участники', icon: 'pi pi-fw pi-user'},
            {label: 'Информация к событию', icon: 'pi pi-fw pi-info-circle'},
            {label: 'Оценка', icon: 'pi pi-fw pi-dollar'},
            {label: 'Протокол', icon: 'pi pi-fw pi-file'},
        ];
        this.activeItem = this.items[0];
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
    }
    
    
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    
    



  actions: CalendarEventAction[] = [
      {
          label: '<i class="fas fa-fw fa-pencil-alt"></i>',
          a11yLabel: 'Edit',
          onClick: ({event}: { event: CalendarEvent }): void => {
              this.handleEvent('Edited', event);
          },
      },
      {
          label: '<i class="fas fa-fw fa-trash-alt"></i>',
          a11yLabel: 'Delete',
          onClick: ({event}: { event: CalendarEvent }): void => {
              this.events = this.events.filter((iEvent) => iEvent !== event);
              this.handleEvent('Deleted', event);
          },
      },
  ];
    
    showEventDetails(id: string) {
        this.apiEventService.getEventDetailsById(id).subscribe({
            next: eventDetails => {
                console.log(eventDetails);
                this.eventDetail = eventDetails;
                this.endLoading = true;
                this.display = true;
            }, error: err => {
                this.alertService.errorApi(err);
            }
        });
        // this.customerService.getEventsDetail().then((eventDetails) => {
        //   this.eventDetail = eventDetails;
        //   this.endLoading = true;
        //   this.display = true;
        //   // this.events.forEach((customer) => (customer.end = new Date(customer.end)));
        // });
    }
    
    
    showDetails() {
        this.display = true;
    }
    
    dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen) || events.length === 0);
            this.viewDate = date;
        }
    }
    
    eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
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
      this.modalData = {event, action};
      this.showDetails();
      console.log(event);
      let id: string = String(event.id);
      this.showEventDetails(id);
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
    
    copyThisEvent() {
        let copyEventDetail = this.eventDetail;
        if (copyEventDetail.id === '') {
            this.alertService.error('Копия уже создана');
        } else {
            copyEventDetail.title = 'Копия ' + this.eventDetail.title;
            copyEventDetail.id = '';
            this.eventDetail = copyEventDetail;
            this.alertService.success('Копия ' + copyEventDetail.title + ' успешно создана');
        }
        
    }
}
