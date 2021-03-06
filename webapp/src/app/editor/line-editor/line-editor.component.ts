import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import {TextEditorComponent} from './single-line-editors/text-editor/text-editor.component';
import {SingleTypographyEditorComponent} from './single-line-editors/typography-editor/single-typography-editor.component';
import {EditorService} from '../editor.service';
import {api} from '../../settings';
import {DatasetCom} from '../../common/dataset-communication';

@Component({
  selector: 'app-line-editor',
  templateUrl: './line-editor.component.html',
  styleUrls: ['./line-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineEditorComponent implements OnInit {
  @Input() datasetCom: DatasetCom;
  @Input() file: string;
  @Input() font = '';
  @Input() separators = new Array<string>(' ');
  @Input() showPrediction = false;
  @Input() hideCorrect = false;

  @ViewChild(TextEditorComponent) textEditor: TextEditorComponent;
  @ViewChild(SingleTypographyEditorComponent) typographyEditor: SingleTypographyEditorComponent;

  protected virtualKeyboard = this.editor.virtualKeyboard;

  get editorComp() {
    return this.textEditor || this.typographyEditor;
  }

  isCorrect() {
    if (!this.editorComp) { return false; }
    return this.editorComp.isCorrect();
  }

  isSaved() {
    if (!this.editorComp) { return true; }
    return this.editorComp.corrected;
  }


  basename = (s: string) => s.split('.')[0];

  constructor(
    protected editor: EditorService,
  ) { }

  ngOnInit() {
  }

  resourceUrl(s: string) {
    return api + '/content?path=' + encodeURIComponent(this.datasetCom.path + '/' + s);
  }


}
