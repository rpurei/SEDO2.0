import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRoomsList1C } from '../../../models/1C/IOptions-1C';


@Injectable({
    providedIn: 'root',
})
export class Rooms1CService {
    url = 'https://api.zdmail.ru/service';
    
    constructor(private http: HttpClient) {
    }
    public getAllRoomsFrom1C(): Observable<any> {
        return this.http.post<IRoomsList1C[]>(this.url, {
            method: 'roomsList',
            user: JSON.parse(localStorage.getItem('user')!).id
        });
    }
    
}
