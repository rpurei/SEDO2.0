import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { IUser } from '../../../models/IUser';
import { PagesComponent } from '../pages.component';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert/alert.service';
import { MenuItem } from 'primeng/api';
import { Representative } from '../../demo/api/customer';
import { LoaderService } from '../../../services/loader.service';
import { EMPTY, finalize, forkJoin, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
    userDetails: IUser = {} as IUser;
    userDetailsShow: boolean = false;
    tasks: any;
    pieOptions: any;
    countTasks: any;
    dateNow: any;
    items!: MenuItem[];
    display: boolean = false;
    displayUser: boolean = false;
    widgets: any[] = [];
    currentUser: IUser = {} as IUser;
    
    usersList: any = [];
    representatives: Representative[] = [];
    statuses: any[] = [];
    activityValues: number[] = [0, 100];
    
    constructor(public loaderService: LoaderService,
                private userService: UsersService,
                private PagesComponent: PagesComponent,
                private alertService: AlertService,
                private authService: AuthService
    ) {
    }
    
    
    initService() {
        this.loaderService.isLoading.next(true);
        forkJoin([
            this.userService.getUsersList(),
            this.authService.getUserDetails(this.authService.getUserId()),
            this.authService.verifyToken(),
        ]).pipe(
            tap(([usersList, userDetail]) => {
                this.userDetails = userDetail;
                this.usersList = usersList;
                this.userDetailsShow = true;
            }),
            catchError(err => {
                this.alertService.errorApi(err);
                return EMPTY;
            }),
            finalize(() => this.loaderService.isLoading.next(false))
        ).subscribe();
    }
    
    ngOnInit(): any {
        this.initService();
        this.statuses = [
            {label: 'Unqualified', value: 'unqualified'},
            {label: 'Qualified', value: 'qualified'},
            {label: 'New', value: 'new'},
            {label: 'Negotiation', value: 'negotiation'},
            {label: 'Renewal', value: 'renewal'},
            {label: 'Proposal', value: 'proposal'}
        ];
        this.representatives = [
            {name: 'Amy Elsner', image: 'amyelsner.png'},
            {name: 'Anna Fali', image: 'annafali.png'},
            {name: 'Asiya Javayant', image: 'asiyajavayant.png'},
            {name: 'Bernardo Dominic', image: 'bernardodominic.png'},
            {name: 'Elwin Sharvill', image: 'elwinsharvill.png'},
            {name: 'Ioni Bowcher', image: 'ionibowcher.png'},
            {name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png'},
            {name: 'Onyama Limba', image: 'onyamalimba.png'},
            {name: 'Stephen Shaw', image: 'stephenshaw.png'},
            {name: 'XuXue Feng', image: 'xuxuefeng.png'}
        ];
        
        this.widgets = [
            {
                title: 'Планировщик',
                img: '../../../../assets/images/widgets/planer.png',
                priority: 1,
                isActive: true
            },
            {
                title: 'Задачи',
                img: '../../../../assets/images/widgets/task.png',
                priority: 2,
                isActive: false
            },
            {
                title: 'Уведомления',
                img: '../../../../assets/images/widgets/analytic.png',
                priority: 3,
                isActive: true
            },
            {
                title: 'Аналитика за месяц',
                img: '../../../../assets/images/widgets/notifications.png',
                priority: 4,
                isActive: true
            },
        
        ];
        this.items = [
            {label: 'Добавить', icon: 'pi pi-fw pi-plus'},
            {label: 'Удалить', icon: 'pi pi-fw pi-minus'}
        ];
        this.dateNow = new Date();
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        // const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        this.tasks = {
            labels: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'],
            datasets: [
                {
                    label: 'Количество задач: ',
                    data: [2, 0, 7, 3, 4, 5],
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--indigo-400'),
                        documentStyle.getPropertyValue('--purple-400'),
                        documentStyle.getPropertyValue('--teal-400'),
                        documentStyle.getPropertyValue('--yellow-400'), // Добавлен новый цвет --red-400
                        documentStyle.getPropertyValue('--green-400') // Добавлен новый цвет --green-400
                    ]
                }]
        };
        this.countTasks = this.tasks.datasets[0].data.reduce((acc: number, number: number) => acc + number);
        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    }
    
    
}
