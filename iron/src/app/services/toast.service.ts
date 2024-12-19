import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {Toast} from '../core-components/toast/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toasts: BehaviorSubject<Toast[]> = new BehaviorSubject<Toast[]>([]);


  addToast(toast: Toast){
    const toasts = this.toasts.value;
    toasts.push(toast)
    this.toasts.next(toasts)
  }

  getToasts(): Observable<Toast[]> {
    return this.toasts.asObservable()
      .pipe(
        tap(toasts => {
            toasts.forEach(toast => setTimeout(() => {this.removeToast(toast.id)},5000));
            return toasts;
          }
        )
      );
  }

  removeToast(toastId: number){
    const toasts = this.toasts.value.filter(toast => toast.id !== toastId);
    this.toasts.next(toasts);
  }


}
