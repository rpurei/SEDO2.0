import { Injectable } from '@angular/core';
import { IOption } from '../../../../models/IOption';
import { IRole1C } from '../../../../models/1C/IRole-1C';
import { IRole } from '../../../../models/IRole';

@Injectable({
    providedIn: 'root',
})
export class RoleConvert1cService {
    
    public changeRoleType(role: IRole1C): IRole {
        return <IOption>{
            id: role.guid,
            name: role.name,
        };
    }
    
    public convertOptions(options: IRole1C[]): IRole[] {
        if (!Array.isArray(options)) {
            return [] as IOption[];
        }
        return options.map(option => this.changeRoleType(option));
    }
}
