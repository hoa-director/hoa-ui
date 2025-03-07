import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
selector: 'app-objection-details',
    templateUrl: './objection-details.component.html',
    styleUrls: ['./objection-details.component.css']
})
export class ObjectionDetailsComponent {
    headerText: string;
    resultText: string;
    closeLabel: string;
    closeDate: string;

    constructor(
        public dialogRef: MatDialogRef<ObjectionDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.headerText = data.source === 'inbox'
        ? 'You have already voted on:' 
        : 'Resolved Motion';

        this.resultText = data.objection.closedAt === null
        ? 'In progress'
        : data.objection.result
            ? 'Approved'
            : 'Disapproved';

        this.closeLabel = data.objection.closedAt === null 
        ? 'Closes at:' 
        : 'Closed at:';

        this.closeDate = data.objection.closedAt === null
        ? data.objection.closesAt
        : data.objection.closedAt;
    }

    close(): void {
        this.dialogRef.close();
    }
}
