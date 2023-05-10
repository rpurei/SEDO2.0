import { Injectable } from '@angular/core';
import { ITaskShort } from '../../models/ITask';


@Injectable({
    providedIn: 'root',
})
export class PlannerFullApiServiceConvert {
    convertApiShortToCalendarEventAction(value: ITaskShort[]) {
        return value;
    }
    
    convertApiDetailsToCalendarEventAction(value: any) {
        value = value * 2;
        return value;
    }
    
    
}
