import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineEditorComponent } from './line-editor.component';

describe('LineEditorComponent', () => {
  let component: LineEditorComponent;
  let fixture: ComponentFixture<LineEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
