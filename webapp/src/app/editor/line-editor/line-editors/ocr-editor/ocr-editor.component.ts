import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {LineEditorComponent} from '../../line-editor.component';
import {EditorService} from '../../../editor.service';

@Component({
  selector: 'app-ocr-editor',
  templateUrl: './ocr-editor.component.html',
  styleUrls: ['./ocr-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OcrEditorComponent extends LineEditorComponent implements OnInit {

  constructor(
    protected editor: EditorService,
  ) { super(editor); }

  ngOnInit() {
  }

}
