import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualKeyboardComponent } from './virtual-keyboard.component';

describe('VirtualKeyboard', () => {
  let component: VirtualKeyboardComponent;
  let fixture: ComponentFixture<VirtualKeyboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualKeyboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
