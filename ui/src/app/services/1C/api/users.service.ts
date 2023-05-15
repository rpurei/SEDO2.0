import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IUserDetailFrom1C } from '../../../models/1C/IUser-1C';

@Injectable({
  providedIn: 'root'
})
export class Users1CService {
  url = '/api/users/'

  constructor(private http: HttpClient) {
  }
    public getAllUsersDetail(): Observable<any> {
        return this.http.get<IUserDetailFrom1C[]>('http://localhost:3000/phonebook')
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
