import { Injectable } from '@angular/core';
import { IUserDetail } from '../../../../models/IUser';
import { IUserDetailFrom1C } from '../../../../models/1C/IUser-1C';


@Injectable({
    providedIn: 'root',
})
export class UserConvert1cService {
    
    convertApiUser(apiEvents: IUserDetailFrom1C[]): IUserDetail[] {
        return apiEvents.map(user => ({
            id: user.guid,
            name: user.fio,
            gender: user.gender,
            email: user.email,
            skype: user.skype,
            phone: user.phone,
            photo: user.foto,
            subdivision: user.subdivision,
            position: user.position,
            birthday: user.birthday,
            department: user.div
        }));
    }
    
}
