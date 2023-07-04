import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class Auth1CService {
    url = '/api/users/';
    
    constructor(private http: HttpClient) {
    }
    
    getUserId(): string {
        let user = localStorage.getItem('user');
        if (user === null) {
            return '';
        }
        return JSON.parse(user).id;
    }
    
    public login1C(username: string, password: string): Observable<any> {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        return this.http.post<any>('https://api.zdmail.ru/login', formData);
    }
    
    public verifyToken1C(): Observable<any> {
        const formData = new FormData();
        const userJson = JSON.parse(localStorage.getItem('user')!);
        formData.append('username', userJson.email);
        formData.append('guid', userJson.id);
        formData.append('token', userJson.token);
        return this.http.post('https://api.zdmail.ru/verifytoken', formData);
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
    // public getUserById(userId: number | string): Observable<any> {
    //   return this.http.get<IUser>(`${environment.apiUrl + this.url + userId}`, {withCredentials: true})
    // }
    //
    // public deleteRoleById(roleId: number | undefined): Observable<any> {
    //   return this.http.delete<IRole[]>(`${environment.apiUrl + this.url + roleId}`, {withCredentials: true})
    // }
    
}
