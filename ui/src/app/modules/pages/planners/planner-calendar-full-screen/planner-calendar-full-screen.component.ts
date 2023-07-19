import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { EMPTY, finalize, forkJoin, Subject, tap } from 'rxjs';
import { CalendarDateFormatter, CalendarEvent, CalendarEventTimesChangedEvent, CalendarView, } from 'angular-calendar';
import { DAYS_OF_WEEK } from 'calendar-utils';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { CustomerService } from '../../../demo/service/customer.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { EventApiServiceConvert } from '../../../../services/1C/api/convert/event-convert-1c.service';
import { EventsService } from '../../../../services/events.service';
import { AlertService } from '../../../../services/alert/alert.service';
import { RoomsService } from '../../../../services/rooms.service';
import { IRoom } from '../../../../models/IRoom';
import { UsersService } from '../../../../services/users.service';
import { IUserDetailList } from '../../../../models/IUser';
import { IEventDetails } from '../../../../models/IEvent';
import { AuthService } from '../../../../services/auth.service';
import { LoaderService } from '../../../../services/loader.service';
import { catchError } from 'rxjs/operators';
import { IOption } from '../../../../models/IOption';

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
        private userService: UsersService,
        private authService: AuthService,
        public loaderService: LoaderService,
        private confirmationService: ConfirmationService,
    ) {
    }
    
    options: MenuItem[] = [];
    selectRoom: IRoom = {id: '', name: 'Все помещения'};
    rooms: IRoom[] = [];
    filteredRooms: IRoom[] = [];
    events: CalendarEvent[] = [];
    allEvents: CalendarEvent[] = [];
    users: IUserDetailList[] = [];
    filteredUsers: IUserDetailList[] = [];
    selectUser!: IUserDetailList;
    activeDayIsOpen: boolean = true;
    nowDate: Date = new Date();
    display: boolean = false;
    view: CalendarView = CalendarView.Month;
    CalendarView = CalendarView;
    viewDate: Date = new Date();
    locale: string = 'ru-MD';
    refresh = new Subject<void>();
    weekStartsOn = DAYS_OF_WEEK.MONDAY;
    loading: boolean = false;
    searchInEvent: boolean = false;
    eventDetail = {} as IEventDetails;
    items: any[] = [];
    activeItem: any;
    endLoading: boolean = false;
    isChange: boolean = false;
    modalData!: {
        action: string;
        event: CalendarEvent;
    };
    
    
    filteredEventsForRooms(room: IRoom) {
        this.events = room.name === 'Все помещения' ? this.allEvents : this.allEvents.filter(event => event.meta === room.name);
    }
    
    filterRooms(event: any) {
        this.filteredRooms = this.roomsService.filterRooms(this.rooms, event);
    }
    
    filterUsers(event: any) {
        this.filteredUsers = this.userService.filterUsers(this.users, event);
    }
    
    getEventFroUser(selectUser: IUserDetailList) {
        this.loaderService.isLoading.next(true);
        this.apiEventService.getEventsShort(selectUser.id, false).subscribe(value => {
            this.events = value;
            this.allEvents = value;
            this.loaderService.isLoading.next(false);
        });
    }
    
    // getEventFroUserInList(selectUser: IUserDetail) {
    //     console.log(this.allEvents);
    //     console.log(selectUser);
    // this.loaderService.isLoading.next(true);
    // this.allEvents.filter((event) => {
    //     return event.meta
    // })
    // }
    
    getEventFroRoom(selectRoom: IRoom) {
        this.filteredEventsForRooms(selectRoom);
    }
    
    getAllEvent() {
        this.loaderService.isLoading.next(true);
        this.apiEventService.getEventsShort(this.authService.getUserId(), true)
            .pipe(
                finalize(() => this.loaderService.isLoading.next(false)))
            .subscribe({
                next: value => {
                    if (value.length === 0) {
                        this.loading = false;
                        this.alertService.error('Ошибка. Обратитесь в поддержку');
                    } else {
                        this.searchInEvent = true;
                        this.events = value;
                        this.allEvents = value;
                        this.loading = false;
                        this.alertService.success('Все события успешно загружены');
                    }
                }
            });
    }
    
    initService() {
        this.loaderService.isLoading.next(true);
        
        forkJoin([
            this.userService.getUsersList(),
            this.roomsService.getAllRooms(),
            this.apiEventService.getEventsShort(this.authService.getUserId(), false),
            this.authService.verifyToken(),
        ]).pipe(
            tap(([users, rooms, events]) => {
                this.users = users;
                this.rooms = [...this.rooms, this.selectRoom, ...rooms];
                this.events = events;
                this.allEvents = events;
            }),
            catchError(err => {
                this.alertService.errorApi(err);
                return EMPTY;
            }),
            finalize(() => this.loaderService.isLoading.next(false))
        ).subscribe();
    }
    
    ngOnInit() {
        this.selectUser = JSON.parse(localStorage.getItem('user')!).name;
        this.initService();
        this.items = [
            {label: 'Участники', icon: 'pi pi-fw pi-user'},
            {label: 'Информация к событию', icon: 'pi pi-fw pi-info-circle'},
            {label: 'Оценка', icon: 'pi pi-fw pi-dollar'},
            {label: 'Протокол', icon: 'pi pi-fw pi-file'},
        ];
        this.activeItem = this.items;
    }
    
    
    // onGlobalFilter(table: Table, event: Event) {
    //     table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    // }
    test: any = 20;
    
    showEventDetails(id: string) {
        let userId = JSON.parse(localStorage.getItem('user')!).id;
        this.isChange = false;
        this.apiEventService.getEventDetailsById(id, userId).subscribe({
            next: eventDetails => {
                this.eventDetail = eventDetails;
                this.endLoading = true;
                this.display = true;
                console.log(id);
            }, error: err => {
                this.alertService.errorApi(err);
                console.log(id);
                
            }
        });
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
      this.display = true;
      let id: string = String(event.id);
      this.showEventDetails(id);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
    
    copyThisEvent() {
        let copyEventDetail = this.eventDetail;
        if (copyEventDetail.title.includes('Копия ')) {
            this.alertService.error('Копия уже создана');
        } else if (copyEventDetail.id === '') {
            this.alertService.error('Нельзя создать копию пустого события');
        } else {
            this.alertService.success('Копия ' + copyEventDetail.title + ' успешно создана');
            copyEventDetail.title = 'Копия ' + this.eventDetail.title;
            copyEventDetail.id = '';
            this.eventDetail = copyEventDetail;
        }
    }
    
    addNewEvent() {
        this.endLoading = true;
        this.display = true;
        this.isChange = true;
        let user = JSON.parse(localStorage.getItem('user')!);
        let author: IOption = {
            name: user.name,
            id: user.id,
            type: 'Справочник.Пользователи'
        };
        this.eventDetail = {
            dateEnd: String(new Date().toISOString()),
            dateStart: String(new Date().toISOString()),
            descriptionEvent: '',
            duration: 0,
            files: [],
            id: '',
            importance: 'Обычная важность',
            initiator: author,
            leader: {name: '', id: '', type: ''} as IOption,
            meetingType: {name: '', id: '', type: ''} as IOption,
            notification: [],
            organization: {name: '', id: '', type: ''} as IOption,
            participants: [],
            room: {name: '', id: '', type: ''} as IOption,
            secretary: {name: '', id: '', type: ''} as IOption,
            softId: '',
            subDiv: {name: '', id: '', type: ''} as IOption,
            title: '',
            typeEvent: {name: '', id: '', type: ''} as IOption,
            violations: []
        };
    }
    
    deleteEvent(event: any) {
        this.confirmationService.confirm({
            key: 'deleteEvent',
            target: event.target || new EventTarget,
            message: 'Вы уверены что хотите удалить мероприятие?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const eventId = this.eventDetail.id;
                this.loaderService.isLoading.next(true);
                this.apiEventService.deleteEvent(eventId).subscribe({
                    next: () => {
                        const indexEvents = this.events.findIndex(event => event.id === eventId);
                        if (indexEvents !== -1) {
                            this.events.splice(indexEvents, 1);
                            this.loaderService.isLoading.next(false);
                        }
                        const indexAllEvents = this.allEvents.findIndex(event => event.id === eventId);
                        if (indexAllEvents !== -1) {
                            this.allEvents.splice(indexAllEvents, 1);
                        }
                        this.alertService.success('Событие успешно удалено');
                        this.refresh.next();
                        this.display = false;
                        this.loaderService.isLoading.next(false);
                    }, error: err => {
                        this.alertService.errorApi(err);
                        this.loaderService.isLoading.next(false);
                    }
                });
            },
        });
    
    }
    
    createEvent(method: string) {
        let dateStart = new Date(this.eventDetail.dateStart);
        let dateEnd = new Date(this.eventDetail.dateEnd);
        let differenceInMilliseconds = dateStart.getTime() - dateEnd.getTime();
        if (!this.eventDetail.title) {
            this.alertService.errorEmptyInput('Название события');
        } else if (!this.eventDetail.typeEvent.name) {
            this.alertService.errorEmptyInput('Тип события');
        } else if (differenceInMilliseconds >= 0) {
            this.alertService.error('Пожалуйста, проверте дату начала и окончания мероприятия');
        } else if (!this.eventDetail.descriptionEvent) {
            this.alertService.errorEmptyInput('Описание события');
        } else if (!this.eventDetail.room.name) {
            this.alertService.errorEmptyInput('Помещение');
        } else if ((this.eventDetail.organization.name !== '') && (!this.eventDetail.subDiv.name)) {
            this.alertService.errorEmptyInput('Выберете компанию');
        } else if (this.eventDetail.participants.length === 0) {
            this.alertService.error('Недостаточно участников для проведения мероприятия');
        } else {
            this.loaderService.isLoading.next(true);
            this.apiEventService.createEvent(method, this.eventDetail).subscribe({
                next: value => {
                    if (value.result === 'success') {
                        if (method === 'editEvent') {
                            this.alertService.success(`Событие ${this.eventDetail.title} успешно обновлено`);
                        } else {
                            this.alertService.success(`Событие ${this.eventDetail.title} успешно добавлено`);
                        }
                        this.initService();
                        this.loaderService.isLoading.next(false);
                        this.display = false;
                    } else {
                        this.alertService.error(value.text);
                        this.loaderService.isLoading.next(false);
                    }
                    console.log(value);
                }, error: err => {
                    console.log(err);
                    this.display = false;
                    this.loaderService.isLoading.next(false);
                }
            });
        }
    }
}
