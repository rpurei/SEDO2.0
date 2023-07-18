import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Users1CService } from './1C/api/users.service';
import { IUserDetailList, } from '../models/IUser';
import { UserConvert1cService } from './1C/api/convert/user-convert-1c.service';
import { IUserDetailListFrom1C } from '../models/1C/IUser-1C';


@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(private users1CService: Users1CService, private usersConvertService: UserConvert1cService) {
    }
    
    public getUsersList(): Observable<IUserDetailList[]> {
        if (environment.backend === '1c') {
            const events$: Observable<IUserDetailListFrom1C[]> = this.users1CService.getAllUsers();
            return events$.pipe(
                map(apiEvents => this.usersConvertService.convertApiUserList(apiEvents)),
                catchError(error => {
                    console.log(error);
                    return of([] as IUserDetailList[]);
                })
            );
        }
        return of([] as IUserDetailList[]);
    }
    
    
    public filterUsers(allRooms: IUserDetailList[], event: any) {
        let filtered: IUserDetailList[] = [];
        let query = event.query;
        for (let i = 0; i < allRooms.length; i++) {
            let user = allRooms[i];
            if (user.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(user);
            }
        }
        return filtered;
    }
    
    public getUser() {
        return JSON.parse(localStorage.getItem('user')!);
    }
}
