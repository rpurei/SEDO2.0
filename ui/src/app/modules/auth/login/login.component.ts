import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertService } from '../../../services/alert/alert.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { first } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
      :host ::ng-deep .pi-eye,
      :host ::ng-deep .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }
    `]
})
export class LoginComponent {
    
    loading = false;
    submitted = false;
    password!: string;
    display: boolean = false;
    username: string = '';
    
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private alertService: AlertService,
        private router: Router,
    ) {
    }
    
    ngOnInit() {
        if (this.authService.currentUser) this.router.navigate(['/page/planner']);
    }
    
    onSubmit() {
        let username = this.username.trim();
        if (!username.includes('@zdmail.ru')) {
            username = username + '@zdmail.ru';
        }
        this.loading = true;
        this.authService.login(username, this.password)
            .pipe(first())
            .subscribe({
                next: value => {
                    if (value.code === 200) {
                        localStorage.setItem('user', JSON.stringify(value.data));
                        location.reload();
                    } else this.alertService.error(value.code === 401 ? 'Ошибка авторизации. Неверный логин или пароль' : value.meta.error);
                }, error: err => {
                    this.alertService.errorApi(err);
                }, complete: () => {
                    this.loading = false;
                }
            });
    
    }
}
