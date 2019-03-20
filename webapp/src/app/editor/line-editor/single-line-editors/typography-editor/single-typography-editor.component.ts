import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
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
  selector: 'app-typography-editor',
  templateUrl: './typography-editor.component.html',
  styleUrls: ['./typography-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyEditorComponent extends TextEditorComponent {
  @Input() typographyChars = 'fgFG';
  @Input() targetSentence = new Sentence('');

  errorStateMatcher = new TypoErrorStateMatcher();

  validator = (control: FormControl) => {
    const value = control.value as string;
    if (value.length !== this.targetSentence.text.length) {
      return {length: value.length};
    }
    return null;
  };

  constructor(
    protected http: HttpClient,
    protected editor: EditorService,
    protected changeDetector: ChangeDetectorRef,
  ) {
    super(http, editor, changeDetector);
    this.inputFormControl = new FormControl('', [this.validator]);
  }

  keydown(e: KeyboardEvent) {
    if (!e.ctrlKey && e.key.length === 1 && this.typographyChars.indexOf(e.key) < 0 && this.sentence.separators.indexOf(e.key) < 0) {
      e.preventDefault();
    } else if (this.typographyChars.indexOf(e.key) >= 0 || this.sentence.separators.indexOf(e.key) >= 0) {
      if (e.ctrlKey || this.sentence.separators.indexOf(e.key) >= 0) {
        this.insertAtCaret(e.key);
      } else {
        const word = this.targetSentence.wordAt(this.caretPos);
        if (!word.isSeparator) {
          const remLength = word.endIdx - this.caretPos;
          // fill word and add separator
          this.insertAtCaret(e.key.repeat(Math.max(0, remLength)) + this.targetSentence.wordAt(word.endIdx).text);
        }
      }
      e.preventDefault();
    }
    super.keydown(e);
  }

}
