import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { IRole } from '../models/IRole';
import { IRole1C } from '../models/1C/IRole-1C';
import { Role1CService } from './1C/api/role.service';
import { RoleConvert1cService } from './1C/api/convert/role-convert-1c.service';


@Injectable({
    providedIn: 'root',
})
export class RoleService {
    constructor(private roleService: Role1CService, private roleConvertService: RoleConvert1cService) {
    }
    
    public getAllRolesByEvent(): Observable<IRole[]> {
        if (environment.backend === '1c') {
            const events$: Observable<IRole1C[]> = this.roleService.getAllForEvent();
            return events$.pipe(
                map(apiEvents => this.roleConvertService.convertOptions(apiEvents)),
                catchError(error => {
                    console.log(error);
                    return of([] as IRole[]);
                })
            );
        }
        return of([] as IRole[]);
    }
    
}
