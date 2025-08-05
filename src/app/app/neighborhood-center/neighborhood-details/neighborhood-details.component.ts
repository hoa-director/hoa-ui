import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
// import { ResolutionCenterService } from "../resolution-center.service";

@Component({
    selector: 'app-neighborhood-details',
    templateUrl: './neighborhood-details.component.html',
    styleUrls: ['./neighborhood-details.component.css'],
    imports: [CommonModule, MatButtonModule, MatDialogModule],
    standalone: true,
})

export class NeighborhoodDetailsComponent implements OnInit {
    name: string;
    createdAt: string;
    updatedAt: string;
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
        this.createdAt = formatDate(data.association.createdAt, 'yyyy-MM-dd', 'en-US');
        this.updatedAt = formatDate(data.association.updatedAt, 'yyyy-MM-dd', 'en-US');
        this.propertyCount = data.association.units.length;
        this.propertyList = data.association.units;
        this.ownerCount = data.association.users.length;
        this.ownerList = data.association.users;
    }

    ngOnInit() {
        if (this.updatedAt === this.createdAt) {
            this.updatedAt = 'Never';
        }
    }

    close(): void {
        this.dialogRef.close();
    }
}
