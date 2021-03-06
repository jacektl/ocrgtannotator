import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LineEditorComponent} from '../../line-editor.component';
import {Sentence} from '../../../../common/sentence';
import {HttpClient} from '@angular/common/http';
import {EditorService} from '../../../editor.service';
import {api} from '../../../../settings';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-simple-typography-editor',
  templateUrl: './simple-typography-editor.component.html',
  styleUrls: ['./simple-typography-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleTypographyEditorComponent extends LineEditorComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() separators: Array<string>;
  @Input() gtExt = '.gt.txt';
  @Input() typoExt = '.typo.txt';
  @Input() predTypoExt = '.pred.typo.txt';
  @Input() typographyChars: string;
  sentence = new BehaviorSubject<Sentence>(new Sentence('', this.separators));

  constructor(
    private http: HttpClient,
    private changeDetector: ChangeDetectorRef,
    protected editor: EditorService,
  ) {
    super(editor);
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.reload();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.reload();
  }

  reload() {
    if (!this.datasetCom) { return; }
    this.http.post<{content: string, exists: boolean}>(api + '/line/', {path: this.datasetCom.path, file: this.basename(this.file), ext: this.gtExt}).subscribe(
      r => {
        this.sentence.next(new Sentence(r.content, this.separators));
        this.changeDetector.markForCheck();
      }
    );
  }

}
