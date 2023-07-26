import { Component, DoCheck, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../../../../services/alert/alert.service';
import { WeatherDataItem } from './IWeather';
import { WeatherService } from './weather.service';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss']
})

export class WeatherComponent implements OnInit, DoCheck {
    
    
    constructor(private http: HttpClient, private alertService: AlertService, private weatherService: WeatherService) {
    }
    
    isLoading: boolean = true;
    weather: WeatherDataItem[] = [];
    weatherDay: number = 0;
    currentDate: Date = new Date();
    
    selectTime(value: string) {
        if (value === 'next') {
            this.weatherDay = this.weatherDay + 1;
        } else {
            this.weatherDay = this.weatherDay - 1;
            if (this.weatherDay < 0) {
                this.weatherDay = 0;
            }
        }
    }
    
    toTextualDescription(degree: number) {
        if (degree > 337.5) return 'Северный';
        if (degree > 292.5) return 'Северо-Западный';
        if (degree > 247.5) return 'Западный';
        if (degree > 202.5) return 'Юго-Западный';
        if (degree > 157.5) return 'Южный';
        if (degree > 122.5) return 'Юго-Восточный';
        if (degree > 67.5) return 'Восточный';
        if (degree > 22.5) {
            return 'Северо-восточный';
        }
        return 'Северный';
    }
    
    ngOnInit(): void {
        this.weatherService.getWeather().subscribe({
            next: value => {
                this.weather = value.list;
            },
            complete: () => {
                this.isLoading = false;
            },
            error: () => {
                this.alertService.error('Ошибка получения данных о погоде');
            }
        });
    }
    
    ngDoCheck(): void {
        this.currentDate = new Date();
    }
}
