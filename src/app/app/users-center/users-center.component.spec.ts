import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersNavigationComponent } from './users-center.component';

describe('UsersNavigationComponent', () => {
  let component: UsersNavigationComponent;
  let fixture: ComponentFixture<UsersNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
