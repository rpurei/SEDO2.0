import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRole1C } from '../../../models/1C/IRole-1C';
import { Auth1CService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class Role1CService {
    
    constructor(private http: HttpClient, private auth1CService: Auth1CService) {
    }
    
    URL: string = 'https://api.zdmail.ru/service';
    
    
    public getAllForEvent(): Observable<any> {
        return this.http.post<IRole1C[]>(this.URL, {
            method: 'eventRoles',
            user: this.auth1CService.getUserId()
        });
    }
    
}
