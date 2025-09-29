import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeighborhoodCenterComponent } from './neighborhood-center.component';

describe('NeighborhoodCenterComponent', () => {
  let component: NeighborhoodCenterComponent;
  let fixture: ComponentFixture<NeighborhoodCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeighborhoodCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeighborhoodCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
