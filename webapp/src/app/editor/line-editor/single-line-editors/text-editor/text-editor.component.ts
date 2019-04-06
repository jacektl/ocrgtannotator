import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EditorService} from '../../../editor.service';
import {Subscription} from 'rxjs';
import {Sentence} from '../../../../common/sentence';
import {FormControl} from '@angular/forms';
import {api} from '../../../../settings';

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
  @Input() font = '';
  @Input() compare = true;
  @Input() predExt = '.pred.txt';

  private _separators = new Array<string>(' ');
  @Input() get separators() { return this._separators; }
  set separators(s: Array<string>) {
    if (s !== this._separators) {
      this._separators = s;
      this.separatorsChanged();
    }
  }

  protected separatorsChanged() {
    this._sentence = new Sentence(this.sentence.text, this.separators);
    this.predSentence = new Sentence(this.predSentence.text, this.separators);
    this.changeDetector.markForCheck();
  }

  @ViewChild('input') input: ElementRef;

  strgPressed = false;
  focussed = false;

  inputFormControl = new FormControl('', []);

  private focusSubscriptions = new Subscription();
  get content(): string { return this.inputFormControl.value; }
  set content(s: string) {
    if (this.content !== s) {
      this.inputFormControl.updateValueAndValidity();
      this.inputFormControl.setValue(s);
      this.updateSentence(this.content);
      this.corrected = false;
      this.changeDetector.markForCheck();
    }
  }

  corrected = false;

  predExists = false;
  predSentence = new Sentence('', this.separators);
  private _sentence = new Sentence('', this.separators);
  get sentence() { return this._sentence; }
  updateSentence(s: string) {
    if (this._sentence.text !== s) {
      this._sentence = new Sentence(s, this.separators);
      this.content = this._sentence.text;
      this.changeDetector.markForCheck();
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
    this.http.post<{content: string, exists: boolean}>(api + '/line/', {path: this.path, file: this.file, ext: this.ext}).subscribe(
      r => {
        this.content = r.content; this.corrected = r.exists;
        this.changeDetector.markForCheck();
      }
    );
    this.http.post<{content: string, exists: boolean}>(api + '/line/', {path: this.path, file: this.file, ext: this.predExt}).subscribe(
      r => {
        this.predSentence = new Sentence(r.content, this.sentence.separators);
        this.predExists = r.exists;
        this.changeDetector.markForCheck();
      }
    );
  }

  onFocus(e: FocusEvent) {
    this.focusSubscriptions.add(this.editor.virtualKeyboard.buttonClicked.subscribe(
      k => this.insertAtCaret(k)
    ));
    this.focussed = true;
  }

  onBlur(e: FocusEvent) {
    this.http.put(api + '/line/', {path: this.path, file: this.file, ext: this.ext, content: this.content}).subscribe(
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
    this.corrected = false;
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
    const value = front + text + back;
    caretPos = caretPos + text.length;
    input.selectionStart = caretPos;
    input.selectionEnd = caretPos;
    input.focus();
    input.scrollTop = scrollPos;
    this.content = value;
    this.changeDetector.markForCheck();
  }
}
