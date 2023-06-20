import { Injectable } from '@angular/core';
import { IOrganization1C } from '../../../../models/1C/IOrganization-1C';
import { OptionConvert1cService } from './option-convert-1c.service';
import { IOrganization } from '../../../../models/IOrganization';


@Injectable({
    providedIn: 'root',
})
export class OrganizationConvert1cService {
    constructor(private optionConvert: OptionConvert1cService) {
    }
    
    convertApiOrganization(apiEvents: IOrganization1C[]): IOrganization[] {
        return apiEvents.map(org => ({
            id: org.guid,
            name: org.name,
            type: org.type!,
            children: this.optionConvert.convertOptions(org.children),
        }));
    }
    
}
