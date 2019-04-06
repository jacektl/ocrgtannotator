import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Sentence} from '../../../../common/sentence';
import DiffMatchPatch from 'diff-match-patch';

@Component({
  selector: 'app-compare-view',
  templateUrl: './compare-view.component.html',
  styleUrls: ['./compare-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompareViewComponent implements OnInit {
  @Input() gtSentence: Sentence;
  @Input() predSentence: Sentence;
  @Input() showPredictionSentence = true;

  readonly dmp = new DiffMatchPatch();

  diff(): Array<[]>  {
    const d = this.dmp.diff_main(this.gtSentence.text, this.predSentence.text);
    return d;
  }

  constructor() { }

  ngOnInit() {
  }

}
