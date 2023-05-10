import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITaskShort } from '../../models/ITask';


@Injectable({
    providedIn: 'root',
})
export class EventsService {
    url = '/api/events/';
    
    constructor(private http: HttpClient) {
    }
    
    public getAllEventsShort(): Observable<any> {
    return this.http.get<ITaskShort[]>('assets/demo/data/task-short.json')
    }
}
