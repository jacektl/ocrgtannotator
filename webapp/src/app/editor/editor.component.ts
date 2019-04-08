import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {EditorService} from './editor.service';
import {VirtualKeyboardComponent} from '../common/virtual-keyboard/virtual-keyboard.component';
import {api} from '../settings';
import {LineEditorComponent} from './line-editor/line-editor.component';
import {DatasetCom} from '../common/dataset-communication';
import {EditorCardComponent} from './line-editor/editor-card/editor-card.component';
import {MatSlideToggleChange} from '@angular/material';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  datasetCom = new BehaviorSubject<DatasetCom>(new DatasetCom());
  viewSelect = '';
  selectedFont = '';
  fonts = ['FreeSans', 'FreeSerif'];
  fontSizes = ['10', '12', '14', '17', '20', '25', '30'];
  selectedFontSize = '17';
  showTitle = true;
  showPrediction = false;
  filter = '';
  hideCorrect = false;

  @ViewChild(VirtualKeyboardComponent) virtualKeyboard: VirtualKeyboardComponent;

  constructor(
    private http: HttpClient,
    private service: EditorService,
  ) { }

  ngOnInit() {
    this.service.virtualKeyboard = this.virtualKeyboard;
    this.onChange('');
    this.viewSelect = 'ocr';
    this.viewSelectionChanged('ocr');
  }

  onChange(path: string) {
    this.http.post(api + '/data/', {path}).subscribe(
      data => {
        this.datasetCom.next(data as DatasetCom); console.log(data);
      }
    );
  }

  showCard(d: string, card: EditorCardComponent) {
    if (this.hideCorrect && card.isCorrect() && card.isSaved()) { return false; }
    return ((this.filter && this.filter.length > 0) ? d.indexOf(this.filter) >= 0 : true);
  }

  changeToSibling(label: string) {
    const path = this.datasetCom.getValue().path;
    this.onChange(path.substring(0, path.lastIndexOf('/') + 1) + label);
  }

  predictionToggled(event: MatSlideToggleChange) {
    if (!event.checked) { this.hideCorrect = false; }
  }

  viewSelectionChanged(type: string) {
    if (type === 'ocr') {
      this.virtualKeyboard.url = api + '/virtual-keyboard/default.json/';
      this.virtualKeyboard.disableEdit = false;
    } else {
      this.virtualKeyboard.url = null;
      this.virtualKeyboard.virtualKeyboard = {rows: []};
      this.virtualKeyboard.disableEdit = true;
    }
  }


}
