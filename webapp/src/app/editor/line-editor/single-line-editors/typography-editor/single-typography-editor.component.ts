import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TextEditorComponent} from '../text-editor/text-editor.component';
import {EditorService} from '../../../editor.service';
import {HttpClient} from '@angular/common/http';
import {Sentence} from '../../../../common/sentence';
import {ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {BehaviorSubject, Subscription} from 'rxjs';


export class TypoErrorStateMatcher implements ErrorStateMatcher {
  constructor(
  ) {}

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid);
  }
}


@Component({
  selector: 'app-single-typography-editor',
  templateUrl: './single-typography-editor.component.html',
  styleUrls: ['./single-typography-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleTypographyEditorComponent extends TextEditorComponent implements OnInit, OnChanges {
  private subscriptions = new Subscription();
  @Input() typographyChars = 'ghp';
  @Input() targetSentence: BehaviorSubject<Sentence>;

  get curTarSen() { return this.targetSentence.getValue(); }

  errorStateMatcher = new TypoErrorStateMatcher();

  lengthValidator = (control: FormControl) => {
    const value = control.value as string;
    if (this.targetSentence && value.length !== this.curTarSen.text.length) {
      return {length: value.length};
    }
    return null;
  };

  invalidCharsValidator = (control: FormControl) => {
    const value = control.value as string;
    for (const c of value) {
      if (this.typographyChars.indexOf(c) < 0 && this.curTarSen.separators.indexOf(c) < 0) {
        return {invalidCharacter: c};
      }
    }
    return null;
  };

  separatorValidator = (control: FormControl) => {
    const value = control.value as string;
    if (!this.targetSentence || !value) { return null; }
    const minL = Math.min(this.curTarSen.text.length, value.length);
    const invPos = [];
    for (let i = 0; i < minL; i++) {
      const c = this.curTarSen.text[i];
      const v = value[i];
      if (this.curTarSen.separators.indexOf(c) < 0 && this.curTarSen.separators.indexOf(v) < 0) {
        continue;
      }
      if (c !== v) {
        invPos.push(i + ' (' + this.curTarSen.wordAt(i - 1).text + ')');
        break;
      }
    }
    if (invPos.length === 0) { return null; }
    return {invalidPos: invPos.join(', ')};
  };

  constructor(
    protected http: HttpClient,
    protected editor: EditorService,
    protected changeDetector: ChangeDetectorRef,
  ) {
    super(http, editor, changeDetector);
    this.inputFormControl = new FormControl('', [this.lengthValidator, this.invalidCharsValidator, this.separatorValidator]);
  }

  ngOnInit() {
    super.ngOnInit();
    this.subscriptions.add(this.targetSentence.subscribe(v => {
      this.separators = v.separators;
      this.updateSentence(this.sentence.text);
      this.inputFormControl.updateValueAndValidity();
      this.changeDetector.markForCheck();
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  keydown(e: KeyboardEvent) {
    if (!e.ctrlKey && e.key.length === 1 && this.typographyChars.indexOf(e.key) < 0 && this.sentence.separators.indexOf(e.key) < 0) {
      e.preventDefault();
    } else if (this.typographyChars.indexOf(e.key) >= 0 || this.sentence.separators.indexOf(e.key) >= 0) {
      if (e.ctrlKey || this.sentence.separators.indexOf(e.key) >= 0) {
        this.insertAtCaret(e.key);
      } else {
        let word = this.curTarSen.wordAt(this.caretPos);
        if (!word.isSeparator) {
          const remLength = word.endIdx - this.caretPos;
          // fill word and add separator
          this.insertAtCaret(e.key.repeat(Math.max(0, remLength)));
          word = this.curTarSen.wordAt(this.caretPos);
        }
        while (word.isSeparator) {
          // add spaces to next word
          this.insertAtCaret(word.text);
          word = this.curTarSen.wordAt(this.caretPos);
        }
      }
      e.preventDefault();
    }
    super.keydown(e);
  }

}
