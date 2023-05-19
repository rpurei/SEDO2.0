import { Injectable } from '@angular/core';
import { Events1CService } from './1C/api/events.service';
import { EventApiServiceConvert } from './1C/api/convert/planner-full-api-convert-1c.service';
import { CalendarEvent } from 'calendar-utils';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IEventFromApi1C } from '../models/1C/IEvent-1C';
import { environment } from '../../environments/environment';
import { IEventDetails } from '../models/IEvent';
import { IOption } from '../models/IOption';
import { OptionConvert1cService } from './1C/api/convert/option-convert-1c.service';


@Injectable({
    providedIn: 'root',
})
export class EventsService {
    constructor(
        private event1CService: Events1CService,
        private eventApiServiceConvert: EventApiServiceConvert,
        private optionConvert: OptionConvert1cService
    ) {
    }
    
    public getAllEventsShort(): Observable<CalendarEvent[]> {
        if (environment.backend === '1c') {
            const events$: Observable<IEventFromApi1C[]> = this.event1CService.getAllEventsShortFrom1C();
            return events$.pipe(
                map(apiEvents => this.eventApiServiceConvert.convertApiShortToCalendarEventAction(apiEvents)),
                catchError(error => {
                    console.log(error);
                    return of([] as CalendarEvent[]);
                })
            );
        }
        return of([] as CalendarEvent[]);
    }
    
    public getUserEventsShort(id: string): Observable<CalendarEvent[]> {
        if (environment.backend === '1c') {
            const events$: Observable<IEventFromApi1C[]> = this.event1CService.getUsersEventsShortFrom1C(id);
            return events$.pipe(
                map(apiEvents => this.eventApiServiceConvert.convertApiShortToCalendarEventAction(apiEvents)),
                catchError(error => {
                    console.log(error);
                    return of([] as CalendarEvent[]);
                })
            );
        }
        return of([] as CalendarEvent[]);
    }
    
    public getEventDetailsById(id: string): Observable<IEventDetails> {
        if (environment.backend === '1c') {
            return this.event1CService.getEventDetailsFrom1CByEventId(id).pipe(
                map(eventDetails => this.eventApiServiceConvert.convertApiEventDetail(eventDetails[0]))
            );
        }
        return of({} as IEventDetails);
    }
    
    public getEventType(): Observable<IOption[]> {
        if (environment.backend === '1c') {
            return this.event1CService.getEventTypes().pipe(
                map(eventType => this.optionConvert.convertOptions(eventType))
            );
        }
        return of([] as IOption[]);
    }
    
    public deleteEvent(id: string): Observable<any> {
        return this.event1CService.deleteEvent(id);
    }
}
