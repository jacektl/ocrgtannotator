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
  @Input() path = '';
  childrenBreadcrumbs = new Array<Breadcrumb>();
  private _children = new Array<string>();
  @Input() set children(c: Array<string>) {
    let eq = true;
    if (this._children.length === c.length) {
      for (let i = 0; i < c.length; i++) {
        if (this._children[i] !== c[i]) {
          eq = false;
          break;
        }
      }
    } else {
      eq = false;
    }
    if (eq) { return; }
    this._children = c;
    this.childrenBreadcrumbs = this.generateChildrenBreadcumbs();
  }
  get children() { return this._children; }

  @Output() change = new EventEmitter<string>();

  value = '';

  breadcrumbs() {
    const b = new Array<Breadcrumb>();
    b.push(new Breadcrumb('Root', ''));
    if (this.path.length === 0) { return b; }
    this.path.split('/').forEach(
      l => b.push(new Breadcrumb(l, b[b.length - 1].path + '/' + l))
    );
    return b;
  }

  private generateChildrenBreadcumbs() {
    console.log(this.path);
    return this.children.map(label => new Breadcrumb(label, this.path + '/' + label));
  }

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.value = '';
  }

  changeToLabel(label: string) {
    this.change.emit(label);
    console.log(label);
  }

}
