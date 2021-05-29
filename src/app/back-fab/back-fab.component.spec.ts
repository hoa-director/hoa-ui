/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BackFabComponent } from './back-fab.component';

describe('BackFabComponent', () => {
  let component: BackFabComponent;
  let fixture: ComponentFixture<BackFabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackFabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
