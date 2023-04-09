import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AlertOptions, AlertType, IAlert } from '../models/IAlert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<IAlert>();
  private defaultId = 'default-alert';
  public isSuccess = new Subject<boolean>();

  onAlert(id = this.defaultId): Observable<IAlert> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  success(message: string, options?: AlertOptions) {
    this.alert(new IAlert({...options, type: AlertType.Success, message}));
  }

  error(message: string, options?: AlertOptions) {
    this.alert(new IAlert({...options, type: AlertType.Error, message}));
  }

  info(message: string, options?: AlertOptions) {
    this.alert(new IAlert({...options, type: AlertType.Info, message}));
  }

  warning(message: string, options?: AlertOptions) {
    this.alert(new IAlert({...options, type: AlertType.Warning, message}));
  }

  confirm(message: string, options?: AlertOptions) {
    this.alert(new IAlert({...options, type: AlertType.confirm, message}));
    this.isSuccess.subscribe({next: value => {
       return value
      }})
  }

  alert(alert: IAlert) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }

  clear(id = this.defaultId) {
    this.subject.next(new IAlert({id}));
  }
}
