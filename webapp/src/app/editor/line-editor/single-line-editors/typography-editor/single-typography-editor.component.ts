import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TextEditorComponent} from '../text-editor/text-editor.component';
import {EditorService} from '../../../editor.service';
import {HttpClient} from '@angular/common/http';
import {Sentence} from '../../../../common/sentence';
import {ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';


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
  @Input() typographyChars = 'ghp';
  @Input() targetSentence: Sentence;

  errorStateMatcher = new TypoErrorStateMatcher();

  lengthValidator = (control: FormControl) => {
    const value = control.value as string;
    if (this.targetSentence && value.length !== this.targetSentence.text.length) {
      return {length: value.length};
    }
    return null;
  };

  invalidCharsValidator = (control: FormControl) => {
    const value = control.value as string;
    for (const c of value) {
      if (this.typographyChars.indexOf(c) < 0 && this.targetSentence.separators.indexOf(c) < 0) {
        return {invalidCharacter: c};
      }
    }
    return null;
  };

  separatorValidator = (control: FormControl) => {
    const value = control.value as string;
    if (!this.targetSentence || !value) { return null; }
    const minL = Math.min(this.targetSentence.text.length, value.length);
    const invPos = [];
    for (let i = 0; i < minL; i++) {
      const c = this.targetSentence.text[i];
      const v = value[i];
      if (this.targetSentence.separators.indexOf(c) < 0 && this.targetSentence.separators.indexOf(v) < 0) {
        continue;
      }
      if (c !== v) {
        invPos.push(i + ' (' + this.targetSentence.wordAt(i - 1).text + ')');
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.separators = this.targetSentence.separators;
    this.updateSentence(this.sentence.text);
  }

  keydown(e: KeyboardEvent) {
    if (!e.ctrlKey && e.key.length === 1 && this.typographyChars.indexOf(e.key) < 0 && this.sentence.separators.indexOf(e.key) < 0) {
      e.preventDefault();
    } else if (this.typographyChars.indexOf(e.key) >= 0 || this.sentence.separators.indexOf(e.key) >= 0) {
      if (e.ctrlKey || this.sentence.separators.indexOf(e.key) >= 0) {
        this.insertAtCaret(e.key);
      } else {
        let word = this.targetSentence.wordAt(this.caretPos);
        if (!word.isSeparator) {
          const remLength = word.endIdx - this.caretPos;
          // fill word and add separator
          this.insertAtCaret(e.key.repeat(Math.max(0, remLength)));
          word = this.targetSentence.wordAt(this.caretPos);
        }
        while (word.isSeparator) {
          // add spaces to next word
          this.insertAtCaret(word.text);
          word = this.targetSentence.wordAt(this.caretPos);
        }
      }
      e.preventDefault();
    }
    super.keydown(e);
  }

}
