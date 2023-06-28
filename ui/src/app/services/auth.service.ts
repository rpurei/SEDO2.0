import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../models/IUser';
import { Auth1CService } from './1C/api/auth.service';
import { Users1CService } from './1C/api/users.service';

@Injectable({providedIn: 'root'})
export class AuthService {
    private userSubject: BehaviorSubject<IUser | null> | undefined;
    public user: Observable<IUser | null> | undefined;
    
    constructor(
        private router: Router,
        private http: HttpClient,
        private authService: Auth1CService,
        private users1CService: Users1CService
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }
    
    public get userValue() {
        return this.userSubject?.value;
    }
    
    login(username: string, password: string): Observable<any> {
        return this.authService.login1C(username, password);
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
        // this.userSubject?.next(null);
        this.router.navigate(['/login']);
    }
    
    public getUserId(): string {
        const userJson = localStorage.getItem('user');
        if (userJson) {
            const user = JSON.parse(userJson);
            return user?.id || '';
        }
        return '';
    }
    
    public getUserDetails(): Observable<any> {
        let id = JSON.parse(localStorage.getItem('user')!).id;
        return this.users1CService.getUserById(id);
    }
    
    public verifyToken(): Observable<any> {
        return this.authService.verifyToken1C();
    }
    
}
