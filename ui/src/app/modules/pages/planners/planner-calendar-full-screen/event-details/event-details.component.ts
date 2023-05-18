import { Component, Input, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { IEventDetails } from '../../../../../models/IEvent';
import { EventsService } from '../../../../../services/events.service';
import { IOption } from '../../../../../models/IOption';
import { AlertService } from '../../../../../services/alert/alert.service';
import { IRoom } from '../../../../../models/IRoom';
import { OrganizationService } from '../../../../../services/organization.service';
import { IOrganization } from '../../../../../models/IOrganization';
import { IParticipant, IUserDetail } from '../../../../../models/IUser';
import { ConfirmationService } from 'primeng/api';
import { RoleService } from '../../../../../services/role.service';
import { IRole } from '../../../../../models/IRole';

@Component({
    selector: 'app-event-details',
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.scss'],
    providers: [ConfirmationService]
})
export class EventDetailsComponent implements OnInit {
    constructor(
        private eventsService: EventsService,
        private alertService: AlertService,
        private organizationService: OrganizationService,
        private confirmationService: ConfirmationService,
        private roleService: RoleService
    ) {
    }
    
    @Input() isChange: boolean = false;
    @Input() rooms: IRoom[] = [];
    @Input() eventDetail: IEventDetails = {} as IEventDetails;
    @Input() users: IUserDetail[] = [];
    selectedOrganisation: string = '';
    dateStart: Date = new Date();
    dateEnd: Date = new Date();
    eventsType: IOption[] = [];
    filteredEventsType: IOption[] = [];
    filteredRooms: IRoom[] = [];
    organization: IOrganization[] = [];
    filteredOrganization: IOrganization[] = [];
    participants: IParticipant[] = [];
    filteredUsers: IUserDetail[] = [];
    selectUser: IUserDetail = {} as IUserDetail;
    roleEvent: IRole[] = [];
    filteredRole: IRole[] = [];
    selectRole: IRole = {} as IRole;
    visibleAddNewParticipants: boolean = false;
    
    
    filteredCountries: any;
    countries: any[] = [];
    cities: any;
    activeItem: any;
    uploadedFiles: any[] = [];
    items: any[] = [];
    loading: boolean = false;
    people!: any[]; // TODO: создать интерфейс
    visibleModification: boolean = false;
    display: boolean = false;
    
    test() {
        console.log('Привет из ребенка');
    }
    
    addParticipants() {
        this.visibleAddNewParticipants = true;
    }
    
    addNewParticipants() {
        if (this.eventDetail.participants.some(participant => participant.user.name === this.selectUser.name)) {
            this.alertService.error('Участник уже добавлен.');
        } else if (!this.selectUser || !this.selectUser) {
            this.alertService.error('Поле "участник" или "роль" не может быть пустым.');
        } else {
            let user: IParticipant = {
                deputy: {name: '', id: ''},
                user: this.selectUser,
                role: this.selectRole,
                isAbsent: false,
                isKnow: 'Не принято',
                isMust: false,
                presence: 'pesonal1',
                presenceRus: 'Личное присутствие'
            };
            this.eventDetail.participants.push(user);
            this.selectRole = {} as IRole;
            this.selectUser = {} as IUserDetail;
            this.alertService.success('Пользователь успешно добавлен. Для сохранения изменений нажмите кнопку "Сохранить"');
        }
    }
    
    filterUsers(event: any) {
        const filteredType: IUserDetail[] = [];
        const query = event.query;
        for (let i = 0; i < this.users.length; i++) {
            const type = this.users[i];
            if (type.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filteredType.push(type);
            }
        }
        this.filteredUsers = filteredType;
    }
    
    filterRole(event: any) {
        const filteredType: IRole[] = [];
        const query = event.query;
        for (let i = 0; i < this.roleEvent.length; i++) {
            const type = this.roleEvent[i];
            if (type.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filteredType.push(type);
            }
        }
        this.filteredRole = filteredType;
    }
    
    deleteParticipant(event: Event, participantNumber: number) {
        this.confirmationService.confirm({
            key: 'deleteParticipant',
            target: event.target || new EventTarget,
            message: 'Вы уверены?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.alertService.success('Участник успешно удален из события');
                this.eventDetail.participants.splice(participantNumber, 1);
            },
        });
    }
    
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
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
    
    filterEventType(event: any) {
        console.log(event);
        const filteredType: IOption[] = [];
        const query = event.query;
        for (let i = 0; i < this.eventsType.length; i++) {
            const type = this.eventsType[i];
            if (type.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filteredType.push(type);
            }
        }
        this.filteredEventsType = filteredType;
    }
    
    filterOrganization(event: any) {
        const filteredType: IOrganization[] = [];
        const query = event.query;
        for (let i = 0; i < this.organization.length; i++) {
            const type = this.organization[i];
            if (type.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filteredType.push(type);
            }
        }
        this.filteredOrganization = filteredType;
    }
    
    
    filterRoom(event: any) {
        const filteredRooms: IRoom[] = [];
        const query = event.query;
        for (let i = 0; i < this.rooms.length; i++) {
            const room = this.rooms[i];
            if (room.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filteredRooms.push(room);
            }
        }
        this.filteredRooms = filteredRooms;
    }
    
    
    ngOnInit(): void {
        this.roleService.getAllRolesByEvent().subscribe({
            next: value => {
                this.roleEvent = value;
            }
        });
        this.organizationService.getOrganization().subscribe({
            next: value => {
                console.log(value);
                this.organization = value;
            }
        });
        
        this.eventsService.getEventType().subscribe({
            next: value => {
                this.eventsType = value;
            }, error: err => {
                this.alertService.errorApi(err);
            }
        });
        this.rooms.splice(0, 1);
        this.participants = this.eventDetail.participants;
        this.dateStart = new Date(this.eventDetail.dateStart);
        this.dateEnd = new Date(this.eventDetail.dateEnd);
        this.selectedOrganisation = this.eventDetail.organization.name;
        this.items = [
            {label: 'Участники', icon: 'pi pi-fw pi-user'},
            {label: 'Информация к событию', icon: 'pi pi-fw pi-info-circle'},
            // {label: 'Оценка', icon: 'pi pi-fw pi-dollar'},
            // {label: 'Протокол', icon: 'pi pi-fw pi-file'},
        ];
        this.activeItem = this.items[0];
    }
    
    
}
