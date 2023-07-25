import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from './IWeather';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    
    constructor(private http: HttpClient) {
    }
    
    getWeather(): Observable<WeatherData> {
        return this.http.get<WeatherData>('https://api.openweathermap.org/data/2.5/forecast?lat=50.595414&lon=36.587260', {
            params: {
                'units': 'metric',
                'appid': 'ebddb934710f1675d16c4b7b8b17dee1',
                'lang': 'ru'
            }
        }).pipe(
            map((value: WeatherData) => {
                const weatherList = value.list;
                for (let i = 0; i < weatherList.length; i++) {
                    weatherList[i].main.temp = Math.round(weatherList[i].main.temp);
                    weatherList[i].main.feels_like = Math.round(weatherList[i].main.feels_like);
                    weatherList[i].main.pressure = Math.round(weatherList[i].main.pressure * 0.75006375541921);
                    weatherList[i].wind.speed = Math.round(weatherList[i].wind.speed);
                }
                return value;
            })
        );
    }
}
