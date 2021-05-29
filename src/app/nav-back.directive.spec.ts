/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { NavBackDirective } from './nav-back.directive';
import { BackFabComponent } from './back-fab/back-fab.component';
import { Location } from '@angular/common';

describe('Directive: NavBack', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ Location, NavBackDirective ],
    })
    .createComponent(NavBackDirective);
  });

  const comp = TestBed.inject(NavBackDirective);
  const locationService = TestBed.inject(Location);

  it('should create an instance', () => {
    const directive = new NavBackDirective(locationService);
    expect(directive).toBeTruthy();
  });
});
