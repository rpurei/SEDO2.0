import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigModule } from './modules/config/config.module';
import { NgTranslateModule } from './modules/translate/translate.module';
import { MessageService } from 'primeng/api';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        ConfigModule,
        NgTranslateModule,
    ],
    providers: [MessageService],
    bootstrap: [AppComponent],
})
export class AppModule {}
