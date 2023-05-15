import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Users1CService } from './1C/api/users.service';
import { IUserDetail,  } from '../models/IUser';
import { UserConvert1cService } from './1C/api/convert/user-convert-1c.service';
import { IUserDetailFrom1C } from '../models/1C/IUser-1C';


@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(private users1CService: Users1CService, private usersConvertService: UserConvert1cService) {
    }
    
    public getAllUsersDetail(): Observable<IUserDetail[]> {
        if (environment.backend ==='1c') {
            const events$: Observable<IUserDetailFrom1C[]> = this.users1CService.getAllUsersDetail();
            return events$.pipe(
                map(apiEvents => this.usersConvertService.convertApiUser(apiEvents)),
                catchError(error => {
                    console.log(error);
                    return of([] as IUserDetail[]);
                })
            );
        } return of([] as IUserDetail[]);
    }
    public filterUsers(allRooms: IUserDetail[], event: any) {
        let filtered: IUserDetail[] = [];
        let query = event.query;
        for (let i = 0; i < allRooms.length; i++) {
            let user = allRooms[i];
            if (user.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(user);
            }
        }
        return filtered;
    }
}
