import { Injectable } from '@angular/core';
import { IUserDetailList, IUserDetails } from '../../../../models/IUser';
import { IUserDetailListFrom1C, IUserDetailsFrom1C } from '../../../../models/1C/IUser-1C';
import { OptionConvert1cService } from './option-convert-1c.service';

@Injectable({
    providedIn: 'root',
})
export class UserConvert1cService {
    constructor(public optionConvert1cService: OptionConvert1cService) {
    }
    
    convertApiUserList(apiEvents: IUserDetailListFrom1C[]): IUserDetailList[] {
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
    
    convertUserDetails(userDetails: IUserDetailsFrom1C): IUserDetails {
        return <IUserDetails>{
            boss: this.optionConvert1cService.changeOptionsType(userDetails.boss),
            div: this.optionConvert1cService.changeOptionsType(userDetails.div),
            email: userDetails.email,
            gender: userDetails.gender,
            id: userDetails.guid,
            name: userDetails.name,
            photo: userDetails.photo,
            position: this.optionConvert1cService.changeOptionsType(userDetails.position),
            subdiv: this.optionConvert1cService.changeOptionsType(userDetails.subdiv),
            userRole: userDetails.userRole,
            phone: userDetails.phone
        };
    }
    
}
