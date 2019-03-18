import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

export class DatasetCom {
  constructor(
    public path = '',
    public label = '',
    public files = new Array<string>(),
    public children = new Array<string>(),
  ) {}
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  datasetCom = new BehaviorSubject<DatasetCom>(new DatasetCom());

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.onChange('');
  }

  onChange(path: string) {
    this.http.post('/api/data/', {path}).subscribe(
      data => { this.datasetCom.next(data as DatasetCom); console.log(data); }
    );

  }

  resourceUrl(s: string) {
    return '/api/content?path=' + encodeURIComponent(this.datasetCom.getValue().label + '/' + s);
  }

}
