import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsEditComponent } from './units-edit.component';

describe('UnitsEditComponent', () => {
  let component: UnitsEditComponent;
  let fixture: ComponentFixture<UnitsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
