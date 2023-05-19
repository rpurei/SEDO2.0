import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private alertService: AlertService,
        private router: Router
    ) {
    }
    
    ngOnInit() {
        if (this.authService.currentUser) this.router.navigate(['/']);
        this.formGroup = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    
    onSubmit() {
        this.submitted = true;
        
        if (this.formGroup?.invalid) {
            return;
        }
        
        this.loading = true;
        this.authService.login(this.formGroup?.controls['username'].value,
            this.formGroup?.controls['password'].value).pipe(first()).subscribe({
                next: () => {
                    this.router.navigateByUrl('/page');
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            }
        );
    }
}
