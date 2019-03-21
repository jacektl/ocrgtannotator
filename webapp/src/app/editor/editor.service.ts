import { Injectable } from '@angular/core';
import {VirtualKeyboardComponent} from '../common/virtual-keyboard/virtual-keyboard.component';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  virtualKeyboard: VirtualKeyboardComponent;

  constructor() { }
}
