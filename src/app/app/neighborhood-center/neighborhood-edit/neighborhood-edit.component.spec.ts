import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeighborhoodEditComponent } from './neighborhood-edit.component';

describe('NeighborhoodEditComponent', () => {
  let component: NeighborhoodEditComponent;
  let fixture: ComponentFixture<NeighborhoodEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeighborhoodEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeighborhoodEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
