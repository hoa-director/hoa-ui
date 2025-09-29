/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NeighborhoodDetailsComponent } from './neighborhood-details.component';

describe('NeighborhoodDetailsComponent', () => {
    let component: NeighborhoodDetailsComponent;
    let fixture: ComponentFixture<NeighborhoodDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ NeighborhoodDetailsComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NeighborhoodDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
