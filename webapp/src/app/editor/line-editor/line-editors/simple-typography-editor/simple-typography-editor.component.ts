import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LineEditorComponent} from '../../line-editor.component';
import {Sentence} from '../../../../common/sentence';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-simple-typography-editor',
  templateUrl: './simple-typography-editor.component.html',
  styleUrls: ['./simple-typography-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleTypographyEditorComponent extends LineEditorComponent implements OnInit, OnChanges {
  @Input() separators: Array<string>;
  @Input() gtExt = '.gt.txt';
  sentence = new Sentence('', this.separators);

  constructor(
    private http: HttpClient,
    private changeDetector: ChangeDetectorRef,
  ) { super(); }

  ngOnInit() {
    this.reload();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.reload();
  }

  reload() {
    if (!this.datasetCom) { return; }
    this.http.post<{content: string, exists: boolean}>('/api/line/', {path: this.datasetCom.path, file: this.basename(this.file), ext: this.gtExt}).subscribe(
      r => {
        this.sentence = new Sentence(r.content , this.separators);
        this.changeDetector.markForCheck();
      }
    );
  }

}
