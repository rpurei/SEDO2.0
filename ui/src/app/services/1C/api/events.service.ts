import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEventDetailsFrom1C, IEventFromApi1C } from '../../../models/1C/IEvent-1C';
import { IOptions1C, IRoomsList1C } from '../../../models/1C/IOptions-1C';
import { UsersService } from '../../users.service';


@Injectable({
    providedIn: 'root',
})
export class Events1CService {
    url = '/events';
    
    constructor(private http: HttpClient,
                private userService: UsersService) {
    }
    
    method: string = 'method';
    guid: string = '96f32757-cb70-11ec-b5b3-0050569a9811';
    
    public getAllEventsShortFrom1C(id: string): Observable<any> {
        return this.http.post<IEventFromApi1C[]>('https://api.zdmail.ru/service', {
            method: 'userEdoEvents',
            user: id,
            params: {
                allUsers: false
            }
        });
    }
    
    public getEventsShortFrom1C(id: string, allUsers: boolean): Observable<any> {
        return this.http.post('https://api.zdmail.ru/service', {
            method: 'userEdoEvents',
            user: id,
            params: {
                allUsers: allUsers
            }
        });
    }
    
    public getEventDetailsFrom1CByEventId(id: string, userId: string): Observable<any> {
        return this.http.post<IEventDetailsFrom1C[]>('https://api.zdmail.ru/service', {
            method: 'eventDetails',
            user: userId,
            params: {
                eventId: id,
                softId: 'DO'
            }
        });
    }
    
    public createNewEvent(eventDetails: IEventDetailsFrom1C): Observable<any> {
        let user = JSON.parse(localStorage.getItem('user')!);
        eventDetails.userId = user.id;
        eventDetails.isFilesVisible = true;
        // eventDetails.org.type =
        console.log(eventDetails.start);
        return this.http.post('https://api.zdmail.ru/service',
            {
                method: 'createEvent',
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
    //     // return this.http.post<IEventFromApi1C[]>('https://api.zdmail.ru/service', formData);
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
        const formData = new FormData();
        formData.append(this.method, 'eventTypes');
        formData.append('user', this.guid);
        return this.http.get<IOptions1C[]>('http://localhost:3000/eventTypes');
    }
    
    public roomsList(): Observable<any> {
        return this.http.post<IRoomsList1C[]>('https://api.zdmail.ru/service', {
            method: 'roomsList'
        });
    }
    
    public deleteEvent(eventId: string): Observable<any> {
        
        return this.http.post('https://api.zdmail.ru/service', {
            method: 'eventCancel',
            user: '96f32757-cb70-11ec-b5b3-0050569a9811',
            params: {
                eventId: eventId,
                cause: 'Delete'
            }
        });
    }
}
