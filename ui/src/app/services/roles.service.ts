import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { IRole } from "../models/IRoles";

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  url = '/api/roles/'

  constructor(private http: HttpClient) {
  }

  public getAllRoles(): Observable<any> {
    return this.http.get<IRole[]>(`${environment.apiUrl + this.url}`, {withCredentials: true})
  }

  public createNewRole(role: IRole): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl + this.url}`, role, {withCredentials: true})
  }

  public updateRole(role: IRole): Observable<any> {
    return this.http.patch<IRole[]>(`${environment.apiUrl + this.url}`, role, {withCredentials: true})
  }

  public getRoleById(roleId: number | string): Observable<any> {
    return this.http.get<IRole[]>(`${environment.apiUrl + this.url + roleId}`, {withCredentials: true})
  }

  public deleteRoleById(roleId: number | undefined): Observable<any> {
    return this.http.delete<IRole[]>(`${environment.apiUrl + this.url + roleId}`, {withCredentials: true})
  }

  public deleteRoleByName(roleName: number | string): Observable<any> {
    return this.http.delete<IRole[]>(`${environment.apiUrl + this.url + roleName}`, {withCredentials: true})
  }

  public getRole () {
    let userRole = JSON.parse(localStorage.getItem('user')!).roles
    return (userRole.includes('creator') || userRole.includes('admin'));
}

}
