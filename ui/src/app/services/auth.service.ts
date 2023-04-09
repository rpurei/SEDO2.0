import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from "../models/IUser";

import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private userSubject: BehaviorSubject<IUser | null> | undefined;
    public user: Observable<IUser | null> | undefined;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject?.value;
    }

    login(username: string, password: string) {
        return this.http.post<IUser>(`${environment.apiUrl}/api/users/login`, { username, password },{withCredentials: true}).pipe(
          map(user => {
                        localStorage.setItem('user', JSON.stringify(user));
                        this.userSubject?.next(user);
                        return user;
                }
          )
        );
    }

    public get currentUser(): IUser {
        let stringUser = localStorage.getItem('user');
        return JSON.parse(String(stringUser));
    }

    public canEdit(): boolean {
        return JSON.parse(String(localStorage.getItem('user'))).roles.includes('admin') || JSON.parse(String(localStorage.getItem('user'))).roles.includes('creator');
    }

    logout() {
        localStorage.removeItem('user');
        this.userSubject?.next(null);
        this.router.navigate(['/login']);
        location.reload()
    }
}
