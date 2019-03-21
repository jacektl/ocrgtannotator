import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualKeyboard } from './virtual-keyboard.component';

describe('VirtualKeyboard', () => {
  let component: VirtualKeyboard;
  let fixture: ComponentFixture<VirtualKeyboard>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualKeyboard ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualKeyboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
