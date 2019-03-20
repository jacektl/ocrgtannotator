import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiblingSelectorComponent } from './sibling-selector.component';

describe('SiblingSelectorComponent', () => {
  let component: SiblingSelectorComponent;
  let fixture: ComponentFixture<SiblingSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiblingSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiblingSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
