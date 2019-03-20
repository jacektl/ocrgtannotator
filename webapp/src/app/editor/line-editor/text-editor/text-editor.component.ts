import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EditorService} from '../../editor.service';
import {Subscription} from 'rxjs';
import {Sentence} from '../../../common/sentence';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextEditorComponent implements OnInit, OnDestroy {
  @Input() path = '';
  @Input() file = '';
  @Input() ext = '.gt.txt';

  @ViewChild('input') input: ElementRef;

  strgPressed = false;
  focussed = false;

  private focusSubscriptions = new Subscription();
  private _content = '';
  get content() { return this._content; }
  set content(s: string) { if (this._content !== s) { this._content = s; this.updateSentence(this._content); this.corrected = false; }}
  corrected = false;

  private _sentence = new Sentence('');
  get sentence() { return this._sentence; }
  updateSentence(s: string) {
    if (this._sentence.text !== s) {
      this._sentence = new Sentence(s);
    }
  }

  get wordHighlightPos() { return this.strgPressed || !this.focussed ? -1 : this.caretPos; }
  get charHighlightPos() { return !this.focussed ? -1 : this.caretPos; }
  get caretPos() { return (this.input.nativeElement as HTMLInputElement).selectionStart; }

  constructor(
    protected http: HttpClient,
    protected editor: EditorService,
    protected changeDetector: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.reload();
  }

  ngOnDestroy(): void {
    this.focusSubscriptions.unsubscribe();
  }

  reload() {
    this.http.post<{content: string, exists: boolean}>('/api/line/', {path: this.path, file: this.file, ext: this.ext}).subscribe(
      r => {
        this.content = r.content; this.corrected = r.exists;
        this.changeDetector.markForCheck();
      }
    );
  }

  onFocus() {
    this.focusSubscriptions.add(this.editor.virtualKeyboard.key.subscribe(
      k => this.insertAtCaret(k)
    ));
    this.focussed = true;
  }

  onBlur() {
    this.http.put('/api/line/', {path: this.path, file: this.file, ext: this.ext, content: this.content}).subscribe(
      r => {
        this.corrected = true;
        this.changeDetector.markForCheck();
      }
    );
    this.focusSubscriptions.unsubscribe();
    this.focusSubscriptions = new Subscription();
    this.focussed = false;
    this.changeDetector.markForCheck();
  }

  inputChanged(e) {
    this.updateSentence(this.content);
  }

  keydown(e: KeyboardEvent) {
    this.changeDetector.markForCheck();
  }

  keyup(e: KeyboardEvent) {
    this.changeDetector.markForCheck();
  }


  insertAtCaret(text: string) {
    const input = this.input.nativeElement as HTMLInputElement;
    const scrollPos = input.scrollTop;
    let caretPos = input.selectionStart;

    const front = (input.value).substring(0, caretPos);
    const back = (input.value).substring(input.selectionEnd, input.value.length);
    input.value = front + text + back;
    caretPos = caretPos + text.length;
    input.selectionStart = caretPos;
    input.selectionEnd = caretPos;
    input.focus();
    input.scrollTop = scrollPos;
    this.content = input.value;
    this.changeDetector.markForCheck();
  }
}
