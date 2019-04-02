import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypographyViewComponent } from './typography-view.component';

describe('TypographyViewComponent', () => {
  let component: TypographyViewComponent;
  let fixture: ComponentFixture<TypographyViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypographyViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypographyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
