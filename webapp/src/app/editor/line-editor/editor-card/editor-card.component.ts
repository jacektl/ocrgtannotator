import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DatasetCom} from '../../../common/dataset-communication';
import {LineEditorComponent} from '../line-editor.component';

@Component({
  selector: 'app-editor-card',
  templateUrl: './editor-card.component.html',
  styleUrls: ['./editor-card.component.scss']
})
export class EditorCardComponent implements OnInit {
  @Input() viewSelect = 'ocr';
  @Input() showTitle = true;
  @Input() datasetCom: DatasetCom;
  @Input() file: string;
  @Input() selectedFont = '';
  @Input() showPrediction = false;
  @Input() hideCorrect = false;

  @ViewChild('ocrEditor') ocrEditor: LineEditorComponent;
  @ViewChild('typoEditor') typoEditor: LineEditorComponent;

  get editor(): LineEditorComponent {
    return this.ocrEditor || this.typoEditor;
  }

  isSaved() {
    if (!this.editor) { return false; }
    return this.editor.isSaved();
  }

  isCorrect() {
    if (!this.editor) { return false; }
    return this.editor.isCorrect();
  }

  constructor() { }

  ngOnInit() {
  }

}
