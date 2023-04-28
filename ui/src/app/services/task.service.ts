import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IRichText, ITask, ITaskShort } from '../models/ITask';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    url = '/api/tasks/';

    constructor(private http: HttpClient) {
    }

    public getAllTasksShort(): Observable<any> {
        // return this.http.get<ITaskCapsule[]>(`${environment.apiUrl + this.url}`, {withCredentials: true});
        return this.http.get<ITaskShort[]>('assets/demo/data/task.json');
    }

    public getTasksCapsuleByGroup(group: string): Observable<any> {
        return this.http.get<ITaskShort[]>(`${environment.apiUrl + this.url + group}`, {withCredentials: true});
    }

    public getTasksById(id: string): Observable<any> {
        return this.http.get<ITask[]>(`${environment.apiUrl + this.url + id}`, {withCredentials: true});
    }

    public addTheAnswerToTheTask(answer: IRichText): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + this.url}`, answer, {withCredentials: true});
    }

    public deleteTheAnswerToTheTask(): Observable<any> {
        return this.http.delete<any>(`${environment.apiUrl + this.url}`, {withCredentials: true});
    }

    public addNewTask(task: ITask): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl + this.url}`, task, {withCredentials: true});
    }


}
