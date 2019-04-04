import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TextViewComponent} from '../text-view/text-view.component';
import {Sentence} from '../../../../common/sentence';

export class TypographyType {
  constructor(
    public char: string,
    public classes: string,
    public prevChar = null,
  ) {
  }
}

class TypographyView {
  constructor(
    public text: string,
    public type: TypographyType,
  ) {
  }
}

@Component({
  selector: 'app-typography-view',
  templateUrl: './typography-view.component.html',
  styleUrls: ['./typography-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyViewComponent extends TextViewComponent implements OnInit {
  @Input() typographySentence: Sentence;


  private typographyTypes = new Array<TypographyType>(
    new TypographyType('g', ''),
    new TypographyType('p', 'small'),
    new TypographyType('h', 'super small', 'p'),
    new TypographyType('h', 'super'),
  );


  getTypographyView(): Array<TypographyView> {
    if (this.typographySentence.text.length === 0) { return []; }
    let currentType = this.typographySentence.text[0];
    let prevType = '';
    let startPos = 0;
    const l = Math.min(this.typographySentence.text.length, this.sentence.text.length)
    const out = new Array<TypographyView>();
    for (let i = 1; i <= l; i++) {
      if (i === l || currentType !== this.typographySentence.text[i]) {
        let text = this.sentence.text.substring(startPos, i);
        text = text.replace(' ', '&nbsp;');
        out.push(new TypographyView(text, this.typeByChar(currentType, prevType)));
        prevType = currentType;
        currentType = this.typographySentence.text[i];
        startPos = i;
      }
    }
    return out;
  }

  typeByChar(c: string, p: string): TypographyType {
    for (const t of this.typographyTypes) {
      if (t.prevChar) {
        if (t.char === c && t.prevChar === p) { return t; }
      } else {
        if (t.char === c) { return t; }
      }
    }
    return new TypographyType('', '');
  }

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
