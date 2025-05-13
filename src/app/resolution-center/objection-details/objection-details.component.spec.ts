/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';

import { ObjectionDetailsComponent } from './objection-details.component';

describe('ObjectionDetailsComponent', () => {
    let component: ObjectionDetailsComponent;
    let fixture: ComponentFixture<ObjectionDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ ObjectionDetailsComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ObjectionDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
