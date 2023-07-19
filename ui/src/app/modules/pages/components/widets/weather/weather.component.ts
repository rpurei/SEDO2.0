import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../../../../services/alert/alert.service';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
    constructor(private http: HttpClient, private alertService: AlertService) {
    }
    
    isLoading: boolean = true;
    weather: any;
    items: any;
    
    getWeather() {
        return this.http.get('https://api.openweathermap.org/data/2.5/weather?lat=50.595414&lon=36.587260',
            {
                params: {
                    'units': 'metric',
                    'appid': 'ebddb934710f1675d16c4b7b8b17dee1',
                    'lang': 'ru'
                }
            });
        
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
        this.items = [
            {
                label: 'Добавить', icon: 'pi pi-fw pi-plus', command: () => {
                    console.log('god');
                }
            },
            {label: 'Удалить', icon: 'pi pi-fw pi-minus'}
        ];
        
        this.getWeather().subscribe({
            next: value => {
                console.log(value);
                this.weather = value;
                this.weather.main.temp = Math.round(this.weather.main.temp);
                this.weather.main.feels_like = Math.round(this.weather.main.feels_like);
                this.weather.main.pressure = Math.round(this.weather.main.pressure * 0.75006375541921);
                this.weather.sys.sunrise = new Date(this.weather.sys.sunrise * 1000);
                this.weather.sys.sunset = new Date(this.weather.sys.sunset * 1000);
                this.weather.wind.speed = Math.round(this.weather.wind.speed);
            }, error: err => {
                this.alertService.errorApi(err);
            }, complete: () => {
                this.isLoading = false;
            }
        });
    }
    
}
