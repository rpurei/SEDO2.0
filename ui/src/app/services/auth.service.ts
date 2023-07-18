import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IUser, IUserDetails } from '../models/IUser';
import { Auth1CService } from './1C/api/auth.service';
import { Users1CService } from './1C/api/users.service';
import { AlertService } from './alert/alert.service';
import { environment } from '../../environments/environment';
import { UserConvert1cService } from './1C/api/convert/user-convert-1c.service';
import { IUserDetailsFrom1C } from '../models/1C/IUser-1C';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService {
    private userSubject: BehaviorSubject<IUser>;
    public user: Observable<IUser>;
    
    constructor(
        private router: Router,
        private http: HttpClient,
        private authService: Auth1CService,
        private users1CService: Users1CService,
        public alertService: AlertService,
        public usersConvertService: UserConvert1cService
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }
    
    public get userValue() {
        return this.userSubject.value;
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
        this.userSubject?.next(null as unknown as IUser);
        this.router.navigate(['/login']);
        console.log(this.userSubject.value);
    }
    
    public getUserId() {
        const userJson = this.currentUser.id;
        if (userJson) {
            return userJson;
        } else {
            this.alertService.error('Ошибка получения данных.');
        }
        return '';
    }
    
    // public getUserDetails(): Observable<IUserDetails> {
    //     let id = this.currentUser.id;
    //     return this.users1CService.getUserById(id);
    // }
    
    public getUserDetails(userId: string): Observable<IUserDetails> {
        if (environment.backend === '1c') {
            const events$: Observable<IUserDetailsFrom1C> = this.users1CService.getUserDetails(userId);
            return events$.pipe(
                map(values => this.usersConvertService.convertUserDetails(values))
            );
        }
        return of({} as IUserDetails);
    }
    
    public verifyToken(): Observable<any> {
        return this.authService.verifyToken1C();
    }
    
}
