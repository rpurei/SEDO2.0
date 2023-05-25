import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AuthService
    ) {
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue;
        if (user) {
            console.log(user);
            return true;
        }
        
        this.router.navigate(['/login']);  //, { queryParams: { returnUrl: state.url }}
        return false;
    }
}

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AuthService
    ) {
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue;
        if (user && user.roles?.includes('admin')) {
            return true;
        }
        
        this.router.navigate(['/']);  //, { queryParams: { returnUrl: state.url }}
        return false;
    }
}

@Injectable({providedIn: 'root'})
export class CreatorGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AuthService
    ) {
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue;
        if (user && (user.roles?.includes('creator') || user.roles?.includes('admin'))) {
            return true;
        }
        
        this.router.navigate(['/']);  //, { queryParams: { returnUrl: state.url }}
        return false;
    }
}
