import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeighborhoodViewComponent } from './neighborhood-view.component';

describe('NeighborhoodViewComponent', () => {
  let component: NeighborhoodViewComponent;
  let fixture: ComponentFixture<NeighborhoodViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeighborhoodViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeighborhoodViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
