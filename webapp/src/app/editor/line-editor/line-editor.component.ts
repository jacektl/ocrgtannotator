import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import {DatasetCom} from '../editor.component';
import {TextEditorComponent} from './text-editor/text-editor.component';
import {TypographyEditorComponent} from './typography-editor/typography-editor.component';

@Component({
  selector: 'app-line-editor',
  templateUrl: './line-editor.component.html',
  styleUrls: ['./line-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineEditorComponent implements OnInit {
  @Input() datasetCom: DatasetCom;
  @Input() file: string;

  @ViewChild(TextEditorComponent) textEditor: TextEditorComponent;
  @ViewChild(TypographyEditorComponent) typographyEditor: TypographyEditorComponent;

  basename = (s: string) => s.split('.')[0];

  constructor() { }

  ngOnInit() {
  }

  resourceUrl(s: string) {
    return '/api/content?path=' + encodeURIComponent(this.datasetCom.path + '/' + s);
  }


}
