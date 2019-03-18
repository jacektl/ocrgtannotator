import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

class Breadcrumb {
  constructor(
    public label = '',
    public path = '',
  )  {}
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent implements OnInit, OnChanges {
  @Input() label = '';
  @Input() children = new Array<string>();

  @Output() change = new EventEmitter<string>();

  value = '';

  breadcrumbs() {
    const b = new Array<Breadcrumb>();
    b.push(new Breadcrumb('Root', ''));
    if (this.label.length === 0) { return b; }
    this.label.split('/').forEach(
      l => b.push(new Breadcrumb(l, b[b.length - 1].path + l))
    );
    return b;
  }

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.value = '';
  }

}
