import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEventDetailsFrom1C, IEventFromApi1C } from '../../../models/1C/IEvent-1C';
import { ICommittee1C, IOptions1C, IRoomsList1C } from '../../../models/1C/IOptions-1C';
import { Auth1CService } from './auth.service';


@Injectable({
    providedIn: 'root',
})
export class Events1CService {
    
    constructor(private http: HttpClient, private auth1CService: Auth1CService) {
    }
    
    URL: string = 'https://api.zdmail.ru/service';
    
    public getAllEventsShortFrom1C(id: string): Observable<any> {
        return this.http.post<IEventFromApi1C[]>(this.URL, {
            method: 'userEdoEvents',
            user: id,
            params: {
                allUsers: false
            }
        });
    }
    
    public getEventsShortFrom1C(id: string, allUsers: boolean): Observable<any> {
        return this.http.post(this.URL, {
            method: 'userEdoEvents',
            user: id,
            params: {
                allUsers: allUsers
            }
        });
    }
    
    public getEventDetailsFrom1CByEventId(id: string, userId: string): Observable<any> {
        return this.http.post<IEventDetailsFrom1C[]>(this.URL, {
            method: 'eventDetails',
            user: userId,
            params: {
                eventId: id,
                softId: 'DO'
            }
        });
    }
    
    public createNewEvent(method: string, eventDetails: IEventDetailsFrom1C): Observable<any> {
        eventDetails.userId = this.auth1CService.getUserId();
        eventDetails.isFilesVisible = true;
        return this.http.post(this.URL,
            {
                method: method,
                params: {
                    data: eventDetails
                }
                
            });
    }
    

    // public getAllEventsShortForRoomFrom1C(id: string): Observable<any> {
    //     const formData = new FormData()
    //     formData.append(this.method, 'userEdoEvents')
    //     formData.append('guid', id)
    //     formData.append('formData[allUsers]', 'false');
    //     // return this.http.post<IEventFromApi1C[]>(this.URL, formData);
    //     return this.http.get<IEventFromApi1C[]>('http://localhost:3000/eventsShort');
    // }
    
    
    //  public verifyToken(): Observable<any> {
    //      const formData = new FormData()
    //      formData.append('username', 'kyrgansky.ku@zdmail.ru')
    //      formData.append('guid', this.guid)
    //      formData.append('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imt5cmdhbnNreS5rdUB6ZG1haWwucnUiLCJndWlkIjoiOTZmMzI3NTctY2I3MC0xMWVjLWI1YjMtMDA1MDU2OWE5ODExIiwiaWF0IjoxNjgzODg0NDk5LCJleHAiOjE2ODUwOTQwOTl9.n8_ZpA6fYFBiEq-WHrLLCqvSced9NTDFrxoQMSieRQo');
    // return this.http.post<any>('https://api.zdmail.ru/verifytoken', formData)
    //  }
    //
    public getEventTypes(): Observable<any> {
        return this.http.post<IOptions1C[]>(this.URL,
            {
                method: 'eventTypes',
                user: this.auth1CService.getUserId()
            });
    }
    
    public getCommitteeTypes(): Observable<any> {
        return this.http.post<ICommittee1C[]>(this.URL,
            {
                method: 'committeeTypes',
                user: this.auth1CService.getUserId()
            });
    }
    
    public roomsList(): Observable<any> {
        return this.http.post<IRoomsList1C[]>(this.URL, {
            method: 'roomsList'
        });
    }
    
    public deleteEvent(eventId: string): Observable<any> {
        return this.http.post(this.URL,
            {
                method: 'eventCancel',
                user: this.auth1CService.getUserId(),
                params: {
                    eventId: eventId,
                    cause: 'Delete'
                }
            });
    }
    
    getQuantityEvents(userId: string): Observable<any> {
        console.log(userId);
        return this.http.post(this.URL, {
            method: 'quantityEvents',
            user: userId
        });
    }
    
}
