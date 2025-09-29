import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ResolutionCenterService } from '../resolution-center.service';
import { UserService } from '../../services/user.service';
import { ObjectionDetailsComponent } from '../objection-details/objection-details.component';

@Component({
  selector: 'app-past-objections',
  templateUrl: './past-objections.component.html',
  styleUrls: ['./past-objections.component.css']
})
export class PastObjectionsComponent implements OnInit {
  public objections;

  public displayedColumns: string[] = [
    "comment",
    "closedAt",
    "view-button",
  ];

  constructor(
    private resolutionCenterService: ResolutionCenterService,
    private userService: UserService,
    private router: Router,
    public route: ActivatedRoute,
    public detailDialog: MatDialog
    ) {}

  ngOnInit() {
    this.init();
    this.userService.selectedAssociation$.subscribe(() => {
      this.init();
    });
  }

   // <a [routerLink]="../objection/{{objection.id}}">View</a>
   openDetails(objection: any): void {
    // console.log('past-objections component, objection:', objection);
    this.detailDialog.open(ObjectionDetailsComponent, {
      width: '500px',
      data: {
        objection: objection, 
        source: 'past-objections'
      }
    });
  }

  // --  Get list of past objections - works
  private init() {
    this.resolutionCenterService.getPastObjections().subscribe((response) => {
      // console.log('getPastObjections_response:', response.objections);
      this.objections = response.objections;
    });
  }
}
