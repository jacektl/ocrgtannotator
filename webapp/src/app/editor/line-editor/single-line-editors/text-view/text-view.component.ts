import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Sentence} from '../../../../common/sentence';

@Component({
  selector: 'app-text-view',
  templateUrl: './text-view.component.html',
  styleUrls: ['./text-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextViewComponent implements OnInit {
  @Input() sentence = new Sentence('');
  @Input() charHighlightIdx = -1;
  @Input() wordHightlightIds = -1;
  @Input() font = '';

  toWordChars(): Array<{text: string, w: boolean, c: boolean}> {
    if (this.charHighlightIdx < 0 && this.wordHightlightIds) {
      return [{text: this.sentence.text, w: false, c: false}];
    }
    let idx = 0;
    let wordIdx = -1;
    if (this.wordHightlightIds >= 0) {
      for (let i = 0; i < this.sentence.words.length; ++i) {
        idx += this.sentence.words[i].text.length;
        if (this.wordHightlightIds < idx) {
          wordIdx = i;
          break;
        }
      }
    }

    const out = [];
    idx = 0;
    const words = this.sentence.words;
    for (let i = 0; i < words.length; ++i) {
      for (let c = 0; c < words[i].text.length; ++c) {
        out.push({text: words[i].text[c].replace(' ', '&nbsp;'), w: i === wordIdx, c: idx === this.charHighlightIdx});
        idx += 1;
      }
    }
    return out;
  }

  constructor() { }

  ngOnInit() {
  }

}
