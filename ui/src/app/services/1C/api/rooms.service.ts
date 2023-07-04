import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRoomsList1C } from '../../../models/1C/IOptions-1C';
import { Auth1CService } from './auth.service';


@Injectable({
    providedIn: 'root',
})
export class Rooms1CService {
    url = 'https://api.zdmail.ru/service';
    
    constructor(private http: HttpClient, private auth1CService: Auth1CService) {
    }
    
    public getAllRoomsFrom1C(): Observable<any> {
        return this.http.post<IRoomsList1C[]>(this.url, {
            method: 'roomsList',
            user: this.auth1CService.getUserId()
        });
    }
    
}
