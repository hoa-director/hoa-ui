/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentBreakTieDialogComponent } from './president-break-tie-dialog.component';

describe('PresidentBreakTieDialogComponent', () => {
  let component: PresidentBreakTieDialogComponent;
  let fixture: ComponentFixture<PresidentBreakTieDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresidentBreakTieDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresidentBreakTieDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
