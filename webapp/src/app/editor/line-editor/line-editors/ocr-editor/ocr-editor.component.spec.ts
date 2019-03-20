import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrEditorComponent } from './ocr-editor.component';

describe('OcrEditorComponent', () => {
  let component: OcrEditorComponent;
  let fixture: ComponentFixture<OcrEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcrEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcrEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
