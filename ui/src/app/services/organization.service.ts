import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Organizations1CService } from './1C/api/organizations.service';
import { OrganizationConvert1cService } from './1C/api/convert/organization-convert-1c.service';
import { IOrganization1C } from '../models/1C/IOrganization-1C';
import { IOrganization } from '../models/IOrganization';


@Injectable({
    providedIn: 'root',
})
export class OrganizationService {
    constructor(
        private organizations1CService: Organizations1CService,
        private organizationConvert1cService: OrganizationConvert1cService
    ) {
    }
    
    public getOrganization(): Observable<IOrganization[]> {
        if (environment.backend === '1c') {
            const events$: Observable<IOrganization1C[]> = this.organizations1CService.getAllOrganizations();
            return events$.pipe(
                map(organization => this.organizationConvert1cService.convertApiOrganization(organization)),
                catchError(error => {
                    console.log(error);
                    return of([] as IOrganization[]);
                })
            );
        }
        console.log('error 1c');
        return of([] as IOrganization[]);
    }
    
    // public getOrganization(): Observable<IOrganization[]> {
    //     return this.organizations1CService.getAllOrganizations()
    // }
}
