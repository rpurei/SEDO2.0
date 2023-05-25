import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    
    formGroup!: FormGroup;
    loading = false;
    submitted = false;
    password!: string;
    display: boolean = false;
    username: any;
    
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
        this.loading = true;
        this.authService.login(this.username, this.password).pipe(first()).subscribe({
            next: value => {
                if (value.code === 200) {
                    localStorage.setItem('user', JSON.stringify(value.data));
                    location.reload();
                } else if (value.code === 401) {
                    this.alertService.error('Ошибка авторизации');
                    this.loading = false;
                } else {
                    this.alertService.errorApi(value.meta.error);
                    this.loading = false;
                }
            }, error: err => {
                this.alertService.errorApi(err);
            }
        });
    
    }
}
