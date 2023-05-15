import { Injectable } from '@angular/core';
import { Events1CService } from './1C/api/events.service';
import { PlannerFullApiServiceConvert } from './1C/api/convert/planner-full-api-convert-1c.service';
import { CalendarEvent } from 'calendar-utils';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IEventFromApi1C } from '../models/1C/IEvent-1C';
import { environment } from '../../environments/environment';


@Injectable({
    providedIn: 'root',
})
export class EventsService {
    constructor(private event1CService: Events1CService, private planerFullApiService: PlannerFullApiServiceConvert) {
    }
    
    public getAllEventsShort(): Observable<CalendarEvent[]> {
        if (environment.backend ==='1c') {
            const events$: Observable<IEventFromApi1C[]> = this.event1CService.getAllEventsShortFrom1C();
            return events$.pipe(
                map(apiEvents => this.planerFullApiService.convertApiShortToCalendarEventAction(apiEvents)),
                catchError(error => {
                    console.log(error);
                    return of([] as CalendarEvent[]);
                })
            );
        } return of([] as CalendarEvent[]);
    }
  
}
