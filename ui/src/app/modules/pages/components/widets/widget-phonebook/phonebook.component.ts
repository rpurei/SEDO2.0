import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoaderService } from '../../../../../services/loader.service';
import { AuthService } from '../../../../../services/auth.service';
import { IUser, IUserDetailList } from '../../../../../models/IUser';
import { Table } from 'primeng/table';
import { UsersService } from '../../../../../services/users.service';
import { AlertService } from '../../../../../services/alert/alert.service';

@Component({
    selector: 'app-phonebook',
    templateUrl: './phonebook.component.html',
    styleUrls: ['./phonebook.component.scss']
})
export class PhonebookComponent implements OnInit {
    constructor(public loaderService: LoaderService, private authService: AuthService, private userService: UsersService, public alertService: AlertService) {
    }
    
    @ViewChild('filter') filter!: ElementRef;
    usersList: IUserDetailList[] = [] as IUserDetailList[];
    displayUser: boolean = false;
    currentUser: IUser = {} as IUser;
    isLoading: boolean = true;
    items: any;
    
    showUserInfo(userId: string) {
        let users = this.usersList.find((user: { id: string; }) => user.id === userId);
        console.log(users);
        this.loaderService.isLoading.next(true);

        this.authService.getUserDetails(userId).subscribe({
            next: value => {
                this.currentUser = value;
                this.currentUser.phone = users!.phone;
                this.currentUser.email = users!.email;
                this.currentUser.skype = users!.skype;
                this.currentUser.birthday = users!.birthday;
                this.currentUser.department = users!.department;
            }, error: err => {
                this.alertService.errorApi(err);
            }, complete: () => {
                this.loaderService.isLoading.next(false);
                this.displayUser = true;
            }
        });
    }
    
    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
    
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    
    ngOnInit(): void {
        this.items = [
            {
                label: 'Добавить', icon: 'pi pi-fw pi-plus', command: () => {
                    console.log('god');
                }
            },
            {label: 'Удалить', icon: 'pi pi-fw pi-minus'}
        ];
        this.userService.getUsersList().subscribe({
            next: value => {
                this.usersList = value;
            }, error: error => {
                this.alertService.errorApi(error);
            }, complete: () => {
                this.isLoading = false;
            }
        });
    }
    
}
