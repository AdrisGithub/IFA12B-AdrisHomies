import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {Toast, ToastWithoutId} from '../core-components/toast/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toasts: BehaviorSubject<Toast[]> = new BehaviorSubject<Toast[]>([]);
  private id: number = 0;

  addToast(toast: ToastWithoutId){
    const toasts = this.toasts.value;

    const withId = toast as Toast;
    withId.id = this.id++;
    toasts.push(withId)

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
