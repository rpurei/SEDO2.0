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
    // @ts-ignore
    id: string = JSON.parse(localStorage.getItem('user')).id;
    
    constructor(public loaderService: LoaderService,
                private userService: UsersService,
                private PagesComponent: PagesComponent,
                private alertService: AlertService,
                private authService: AuthService,
    ) {
    }
    
    
    initService() {
        this.loaderService.isLoading.next(true);
        forkJoin([
            this.authService.getUserDetails(this.authService.getUserId()),
            this.authService.verifyToken(),
        ]).pipe(
            tap(([userDetail]) => {
                this.userDetails = userDetail;
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
       
        // const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        
    }
    
    
}
