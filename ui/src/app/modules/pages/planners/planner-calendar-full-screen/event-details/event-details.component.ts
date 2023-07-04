import { Component, Input, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { IEventDetails } from '../../../../../models/IEvent';
import { EventsService } from '../../../../../services/events.service';
import { ICommittee, IOption } from '../../../../../models/IOption';
import { AlertService } from '../../../../../services/alert/alert.service';
import { IRoom } from '../../../../../models/IRoom';
import { OrganizationService } from '../../../../../services/organization.service';
import { IOrganization } from '../../../../../models/IOrganization';
import { IParticipant, IUserDetailList } from '../../../../../models/IUser';
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
        private roleService: RoleService,
    ) {
    }
    
    @Input() isChange: boolean = false;
    @Input() rooms: IRoom[] = [];
    @Input() eventDetail: IEventDetails = {} as IEventDetails;
    @Input() users: IUserDetailList[] = [];
    selectedOrganisation: string = '';
    dateStart: Date = new Date();
    dateEnd: Date = new Date();
    eventsType: IOption[] = [];
    filteredEventsType: IOption[] = [];
    filteredRooms: IRoom[] = [];
    filteredCommitteeTypes: ICommittee[] = [];
    
    organization: IOrganization[] = [];
    filteredOrganization: IOrganization[] = [];
    participants: IParticipant[] = [];
    filteredUsers: IUserDetailList[] = [];
    selectUser: IUserDetailList = {} as IUserDetailList;
    roleEvent: IRole[] = [];
    filteredRole: IRole[] = [];
    selectRole: IRole = {} as IRole;
    visibleAddNewParticipants: boolean = false;
    visibleAddNewFiles: boolean = false;
    committeeTypes: ICommittee[] = [];
    committeeType: any;
    companyName: IOption[] = [];
    selectedOrganization: IOrganization = {} as IOrganization;
    
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
    
    test(a: any) {
        console.log(a);
    }
    
    selectOrganization(organization: IOrganization) {
        this.eventDetail.organization = {
            name: organization.name,
            type: 'Справочник.СтруктураПредприятия',
            id: organization.id
        };
    }
    
    selectCompany(company: IOption) {
        this.eventDetail.subDiv = company;
        this.eventDetail.subDiv.type = 'Справочник.СтруктураПредприятия';
    }
    
    addParticipants() {
        this.visibleAddNewParticipants = true;
    }
    
    addFile() {
        this.visibleAddNewFiles = true;
    }
    
    addNewParticipants() {
        if (this.eventDetail.participants.some(participant => participant.user.name === this.selectUser.name)) {
            this.alertService.error('Участник уже добавлен.');
        } else if (this.selectRole.name === undefined || this.selectUser.name === undefined) {
            this.alertService.error('Поле "участник" или "роль" не может быть пустым.');
        } else {
            let userInfo: IOption = {
                name: this.selectUser.name,
                type: 'Справочник.Пользователи',
                id: this.selectUser.id
            };
            if (this.selectRole.name === 'Председатель') {
                this.eventDetail.leader = userInfo;
            } else if (this.selectRole.name === 'Секретарь') {
                this.eventDetail.secretary = userInfo;
            }
        
            let user: IParticipant = {
                deputy: {name: '', id: '', type: ''},
                order: this.eventDetail.participants.length + 1,
                user: userInfo,
                role: this.selectRole,
                isAbsent: false,
                isKnow: 'Не принято',
                isMust: false,
                presence: 'personal',
                presenceRus: 'Личное присутствие'
            };
            user.role.type = 'Справочник.гкРолиВСовещании';
            this.eventDetail.participants.push(user);
            this.selectRole = {} as IRole;
            this.selectUser = {} as IUserDetailList;
            this.alertService.success('Пользователь успешно добавлен. Для сохранения изменений нажмите кнопку "Сохранить"');
            console.log(this.eventDetail.participants);
        }
    }
    
    filterUsers(event: any) {
        const filteredType: IUserDetailList[] = [];
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
                this.eventDetail.participants.splice(participantNumber, 1);
                this.alertService.success('Участник успешно удален из события');
                console.log(participantNumber);
            },
        });
    }
    
    deleteFile(event: Event, fileNumber: number) {
        this.confirmationService.confirm({
            key: 'deleteFile',
            target: event.target || new EventTarget,
            message: 'Вы уверены?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.alertService.success('Файл успешно удален из события');
                this.eventDetail.files.splice(fileNumber, 1);
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
    
    onDownload(event: any) {
        console.log(event);
        event.files.map((file: any) => this.getBase64(file));
        console.log(1);
        for (const file of event.files) {
            this.uploadedFiles.push(file);
            console.log(2);
            this.alertService.success('Файл успешно загружен');
        }
    }
    
    getBase64(file: any) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    
    changeCommittee(committeeType: ICommittee) {
        this.eventDetail.title = committeeType.name;
        this.eventDetail.meetingType.type = committeeType.type;
        this.eventDetail.meetingType.id = committeeType.id;
        this.eventDetail.meetingType.name = committeeType.name;
        this.eventDetail.secretary = committeeType.secretary;
        committeeType.participants.forEach(participant => {
            const participant1: IParticipant = {
                deputy: {
                    name: '',
                    type: ''
                },
                isAbsent: false,
                order: this.eventDetail.participants.length + 1,
                isKnow: 'Не принято',
                isMust: false,
                presence: '',
                presenceRus: '',
                role: participant.role,
                user: participant.name
            };
            this.eventDetail.participants.push(participant1);
            console.log(participant1);
        });
        console.log(this.eventDetail.participants);
        console.log(committeeType);
    }
    
    filterEventType(event: any) {
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
        console.log(this.companyName);
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
    
    filterCommitteeType(event: any) {
        const filteredType: ICommittee[] = [];
        const query = event.query;
        for (let i = 0; i < this.committeeTypes.length; i++) {
            const type = this.committeeTypes[i];
            if (type.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filteredType.push(type);
            }
        }
        this.filteredCommitteeTypes = filteredType;
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
        this.eventsService.getCommitteeTypes().subscribe({
            next: value => {
                this.committeeTypes = value;
            }
        });
        
        this.rooms.splice(0, 1);
        
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
