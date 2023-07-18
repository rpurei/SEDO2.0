import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserDetailListFrom1C, IUserDetailsFrom1C } from '../../../models/1C/IUser-1C';
import { Auth1CService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class Users1CService {
    
    constructor(private http: HttpClient, private auth1CService: Auth1CService) {
    }
    
    
    URL: string = 'https://api.zdmail.ru/service';
    
    public getAllUsers(): Observable<any> {
        return this.http.post<IUserDetailListFrom1C[]>(this.URL, {
            method: 'phonebookFile',
            user: this.auth1CService.getUserId()
        });
    }
    
    public getUserDetails(userId: string): Observable<any> {
        return this.http.post<IUserDetailsFrom1C>(this.URL, {
            method: 'userDetails',
            user: userId
        });
    }
    
    // public getAllUsers(): Observable<any> {
    //   return this.http.get<IUser[]>(`${environment.apiUrl + this.url}`, {withCredentials: true})
    // }
    //
    // public createNewUser(user: IUser): Observable<any> {
    //   return this.http.post<any>(`${environment.apiUrl + this.url}`, user, {withCredentials: true})
    // }
    //
    // public updateUser(user: IUser): Observable<any> {
    //   return this.http.patch<IUser[]>(`${environment.apiUrl + this.url}`, user, {withCredentials: true})
    // }
    //
    public getUserById(id: string): Observable<IUserDetailsFrom1C> {
        return this.http.post<IUserDetailsFrom1C>(this.URL, {
            method: 'userDetails',
            user: id
        });
    }
    
    //
    // public deleteRoleById(roleId: number | undefined): Observable<any> {
    //   return this.http.delete<IRole[]>(`${environment.apiUrl + this.url + roleId}`, {withCredentials: true})
    // }
    
}
