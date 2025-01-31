import { Component, OnInit } from '@angular/core';

import { ResolutionCenterService } from '../resolution-center.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-past-objections',
  templateUrl: './past-objections.component.html',
  styleUrls: ['./past-objections.component.css']
})
export class PastObjectionsComponent implements OnInit {
  public objections;

  public displayedColumns: string[] = [
    "submitted-by",
    "submitted-against",
    "submitted-on",
    "view-button",
  ];

  constructor(
    private resolutionCenterService: ResolutionCenterService,
    private userService: UserService,
    private router: Router,
    public route: ActivatedRoute
    ) {}

  ngOnInit() {
    this.init();
    this.userService.selectedAssociation$.subscribe(() => {
      this.init();
    });
  }

   // <a [routerLink]="../objection/{{objection.id}}">View</a>
   viewObjection(objectionId: number) {
    this.router.navigate([`objection/${objectionId}`], {
      relativeTo: this.route,
    });
  }

  // --  Get list of past objections - works
  private init() {
    this.resolutionCenterService.getPastObjections().subscribe((response) => {
      console.log('getPastObjections_response:', response.objections);
      this.objections = response.objections;
    });
  }
}
