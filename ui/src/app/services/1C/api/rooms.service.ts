import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRoomsList1C } from '../../../models/1C/IOptions-1C';


@Injectable({
    providedIn: 'root',
})
export class Rooms1CService {
    url = '/api/events/';
    
    constructor(private http: HttpClient) {
    }
    method: string = 'method'
    guid: string = '96f32757-cb70-11ec-b5b3-0050569a9811'
    public getAllRoomsFrom1C(): Observable<any> {
        const formData = new FormData()
        formData.append(this.method, 'userEdoEvents')
        formData.append('user', this.guid)
        formData.append('formData[allUsers]', 'false');
        // return this.http.post<IEventFromApi1C[]>('https://api.zdmail.ru/service', formData);
        return this.http.get<IRoomsList1C[]>('http://localhost:3000/roomsList');
    }
    
}
