import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResolutionCenterService } from "../resolution-center.service";

@Component({
selector: 'app-objection-details',
    templateUrl: './objection-details.component.html',
    styleUrls: ['./objection-details.component.css']
})
export class ObjectionDetailsComponent implements OnInit {
    headerText: string;
    resultText: string;
    closeLabel: string;
    closeDate: string;
    objectionId: number;
    resultLabel: string;
    resultString: string;

    constructor(
        private resolutionCenterService: ResolutionCenterService,
        public dialogRef: MatDialogRef<ObjectionDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.headerText = data.source === 'inbox'
        ? 'You have already voted on:' 
        : 'Resolved motion:';

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

        this.objectionId = data.objection.id;

        this.resultLabel = '';
        this.resultString = '';
    }

    ngOnInit() {
        this.handlePresident(this.objectionId);
    }

    handlePresident(objectionId: number): void {
        const roleTitle: string = sessionStorage.getItem("roleTitle");

        if (roleTitle === 'President') {
            this.resolutionCenterService
                .getVoteCountPres(objectionId)
                .subscribe((response: any) => {
                    this.resultLabel = 'Vote count:';
                    this.resultString = `
                        ${response.votesFor} for, ${response.votesAgainst} against
                    `;
                });
        }
    }

    close(): void {
        this.dialogRef.close();
    }
}
