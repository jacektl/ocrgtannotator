import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSelectChange} from '@angular/material';

@Component({
  selector: 'app-sibling-selector',
  templateUrl: './sibling-selector.component.html',
  styleUrls: ['./sibling-selector.component.scss']
})
export class SiblingSelectorComponent implements OnInit {
  @Input() labels = new Array<string>();
  @Input() currentLabel: string;

  @Output() change = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {
  }

  onChanged(e: MatSelectChange) {
    this.change.emit(e.value);
  }

  onNext() {
    this.change.emit(this.labels[Math.min(this.labels.length - 1, this.labels.indexOf(this.currentLabel) + 1)]);
  }

  onPrev() {
    this.change.emit(this.labels[Math.max(0, this.labels.indexOf(this.currentLabel) - 1)]);
  }

}
