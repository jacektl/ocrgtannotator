import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {
  @Input() path = '';
  @Input() file = '';
  @Input() ext = '.gt.txt';

  content = '';
  corrected = false;

  constructor(
    protected http: HttpClient,
  ) { }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.http.post<{content: string, exists: boolean}>('/api/line/', {path: this.path, file: this.file, ext: this.ext}).subscribe(
      r => { this.content = r.content; this.corrected = r.exists; }
    );
  }

  onChange() {
    this.http.put('/api/line/', {path: this.path, file: this.file, ext: this.ext, content: this.content}).subscribe(
      r => { this.corrected = true; }
    );
  }

}
