import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';

export interface VirtualKeyboardLine {
  keys: Array<string>;
}

export interface VirtualKeyboardData {
  lines: Array<VirtualKeyboardLine>;
}

@Component({
  selector: 'app-virtual-keyboard',
  templateUrl: './virtual-keyboard.component.html',
  styleUrls: ['./virtual-keyboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualKeyboardComponent implements OnInit {
  @Output() key = new EventEmitter<string>();

  virtualKeyboard: VirtualKeyboardData = {
    lines: [
      {
        keys: ['ä', 'Ä', 'ö', 'Ö', 'ü', 'Ü'],
      },
      {
        keys: ['é', 'É', 'ë', 'Ë'],
      },
    ],
  };

  constructor() { }

  ngOnInit() {
  }

  mouseDown(event: MouseEvent) {
    event.preventDefault();  // disable focus change
  }
}
