import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { ResolutionCenterService } from "../resolution-center.service";

@Component({
    selector: 'app-neighborhood-details',
    templateUrl: './neighborhood-details.component.html',
    styleUrls: ['./neighborhood-details.component.css']
})

export class NeighborhoodDetailsComponent implements OnInit {
    name: string;
    createdAt: Date;
    updatedAt: Date;
    propertyCount: number;
    propertyList: string[];
    ownerCount: number;
    ownerList: string[];

    constructor(
        // private resolutionCenterService: ResolutionCenterService,
        public dialogRef: MatDialogRef<NeighborhoodDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.name = data.association.name;
        this.createdAt = data.association.createdAt;
        this.updatedAt = data.association.updatedAt;
        this.propertyCount = data.association.propertyCount;
        this.propertyList = data.association.propertyList;
        this.ownerCount = data.association.ownerCount;
        this.ownerList = data.association.ownerList;
    }

    ngOnInit() {}

    close(): void {
        this.dialogRef.close();
    }
}
