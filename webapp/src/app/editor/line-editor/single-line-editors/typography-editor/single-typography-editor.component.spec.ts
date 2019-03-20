import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTypographyEditorComponent } from './single-typography-editor.component';

describe('SingleTypographyEditorComponent', () => {
  let component: SingleTypographyEditorComponent;
  let fixture: ComponentFixture<SingleTypographyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleTypographyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTypographyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
