import { Injectable, Type } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export interface ModalBase {}

type ModalType = Type<ModalBase>;

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private displayModal$ = new ReplaySubject<ModalType | null>();

  private stack: ModalType[] = [];

  getCurrentModal$ = () => this.displayModal$;

  openModal = (modalType: Type<ModalBase>) => {
    this.stack.push(modalType);
    this.displayModalAtStack();
  };

  closeModal = () => {
    this.stack.pop();
    this.displayModalAtStack();
  };

  clearStack = () => {
    this.stack = [];
    this.displayModalAtStack();
  }

  displayModalAtStack = () => {
    if(this.stack.length == 0) {
      this.displayModal$.next(null);
      return;
    }
    this.displayModal$.next(this.stack[this.stack.length - 1])
  }

}
