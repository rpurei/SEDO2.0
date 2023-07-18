import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LoaderService } from '../../../../../services/loader.service';
import { AuthService } from '../../../../../services/auth.service';
import { IUser } from '../../../../../models/IUser';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-widget-phonebook',
    templateUrl: './widget-phonebook.component.html',
    styleUrls: ['./widget-phonebook.component.scss']
})
export class WidgetPhonebookComponent {
    constructor(public loaderService: LoaderService, private authService: AuthService) {
    }
    
    @Input() usersList: any;
    @ViewChild('filter') filter!: ElementRef;
    
    displayUser: boolean = false;
    currentUser: IUser = {} as IUser;
    
    showUserInfo(userId: string) {
        let users = this.usersList.find((user: { id: string; }) => user.id === userId);
        console.log(users);
        this.loaderService.isLoading.next(true);
        this.authService.getUserDetails(userId).subscribe({
            next: value => {
                this.loaderService.isLoading.next(false);
                this.displayUser = true;
                this.currentUser = value;
                this.currentUser.phone = users.phone;
                this.currentUser.email = users.email;
                this.currentUser.skype = users.skype;
                this.currentUser.birthday = users.birthday;
                this.currentUser.department = users.department;
                console.log(this.currentUser);
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
    
}
