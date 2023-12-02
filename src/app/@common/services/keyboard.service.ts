import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeyboardService {
  keyboardVisibility = new BehaviorSubject<boolean>(false);
  numericKeyboard = new BehaviorSubject<boolean>(false);
  currentInputText = new BehaviorSubject<string>('');
  keyboardText = new BehaviorSubject<string>('');

  currentId!: string;

  get currentText() {
    return this.currentInputText.value;
  }

  get currentText$() {
    return this.currentInputText.asObservable();
  }

  get showKeyboard$() {
    return this.keyboardVisibility.asObservable();
  }

  get keyboardText$() {
    return this.keyboardText.asObservable();
  }

  get isKeyboardNumeric$() {
    return this.numericKeyboard.asObservable();
  }

  constructor() {}

  setCurrentData(id: string, text: string) {
    if (this.currentId !== id) {
      this.currentId = id;
      this.currentInputText.next(text);

      if (text === this.keyboardText.value) {
        this.keyboardText.next(' ');
      } else {
        this.keyboardText.next(text);
      }
    }

    this.currentId = id;
  }

  setCurrentText(text: string) {
    this.currentInputText.next(text);
  }

  setKeyboardText(text: string) {
    this.keyboardText.next(text);
  }

  setCurrentId(id: string) {
    this.currentId = id;
  }

  showKeyboard(id: string, text: string | null) {
    this.keyboardVisibility.next(true);
    this.setCurrentData(id, text || '');
  }

  hideKeyboard() {
    this.keyboardVisibility.next(false);
    this.setCurrentData('', '');
  }

  switchToNumeric() {
    this.numericKeyboard.next(true);
  }

  switchToAlpha() {
    this.numericKeyboard.next(false);
  }
}
