import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AlertService } from '../../services/alert/alert.service';
import { MessageService } from 'primeng/api';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule
    ],
    providers: [AlertService, MessageService]
})
export class AuthModule {
}
