import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRole1C } from '../../../models/1C/IRole-1C';

@Injectable({
    providedIn: 'root'
})
export class Role1CService {
    url = '/api/roles/';
    
    constructor(private http: HttpClient) {
    }
    
    public getAllForEvent(): Observable<any> {
        return this.http.get<IRole1C[]>(`http://localhost:3000/role`);
    }
    
}
