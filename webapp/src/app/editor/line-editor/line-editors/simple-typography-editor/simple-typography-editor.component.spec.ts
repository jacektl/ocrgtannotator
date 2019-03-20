import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTypographyEditorComponent } from './simple-typography-editor.component';

describe('SimpleTypographyEditorComponent', () => {
  let component: SimpleTypographyEditorComponent;
  let fixture: ComponentFixture<SimpleTypographyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleTypographyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleTypographyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
