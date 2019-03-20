import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {LineEditorComponent} from '../../line-editor.component';

@Component({
  selector: 'app-ocr-editor',
  templateUrl: './ocr-editor.component.html',
  styleUrls: ['./ocr-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OcrEditorComponent extends LineEditorComponent implements OnInit {

  constructor() { super(); }

  ngOnInit() {
  }

}
