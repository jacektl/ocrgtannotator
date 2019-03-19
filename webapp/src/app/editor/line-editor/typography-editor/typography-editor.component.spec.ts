import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypographyEditorComponent } from './typography-editor.component';

describe('TypographyEditorComponent', () => {
  let component: TypographyEditorComponent;
  let fixture: ComponentFixture<TypographyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypographyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypographyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
