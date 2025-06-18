import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsEditOwnComponent } from './units-edit-own.component';

describe('UnitsEditOwnComponent', () => {
  let component: UnitsEditOwnComponent;
  let fixture: ComponentFixture<UnitsEditOwnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitsEditOwnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitsEditOwnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
