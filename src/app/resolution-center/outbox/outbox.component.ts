import { Component, OnInit } from "@angular/core";
import { ResolutionCenterService } from "../resolution-center.service";
import { UserService } from "../../services/user.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Objection } from "../models/objection";

@Component({
  selector: "app-outbox",
  templateUrl: "./outbox.component.html",
  styleUrls: ["./outbox.component.css"],
})
export class OutboxComponent implements OnInit {
  public objections: Objection[] = [];

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

  private init() {
    this.resolutionCenterService.getOutbox().subscribe((response) => {
      this.objections = response.objections;
    });
  }
}
