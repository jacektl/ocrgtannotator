import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {EditorService} from './editor.service';
import {VirtualKeyboardComponent} from './virtual-keyboard/virtual-keyboard.component';

export class DatasetCom {
  public name = '';
  constructor(
    public path = '',
    public label = '',
    public remove_path = '',
    public parent = '',
    public files = new Array<string>(),
    public children = new Array<string>(),
    public siblings = new Array<string>(),
  ) {
  }
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  datasetCom = new BehaviorSubject<DatasetCom>(new DatasetCom());

  @ViewChild(VirtualKeyboardComponent) virtualKeyboard: VirtualKeyboardComponent;

  constructor(
    private http: HttpClient,
    private service: EditorService,
  ) { }

  ngOnInit() {
    this.service.virtualKeyboard = this.virtualKeyboard;
    this.onChange('');
  }

  onChange(path: string) {
    this.http.post('/api/data/', {path}).subscribe(
      data => {
        this.datasetCom.next(data as DatasetCom); console.log(data);
      }
    );
  }

  changeToSibling(label: string) {
    const path = this.datasetCom.getValue().path;
    this.onChange(path.substring(0, path.lastIndexOf('/') + 1) + label);
  }

}
