import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { Location } from "@angular/common";
import { UserService } from "../services/user.service";
import { Observable } from "rxjs";
import { AssociationModel } from "app/models/association.model";

@Component({
  selector: "app-association-switch",
  templateUrl: "./association-switch.component.html",
  styleUrls: ["./association-switch.component.css"],
})
export class AssociationSwitchComponent implements OnInit, OnDestroy {
  subscriptions = [];
  currentAssociation: string;
  availableAssociations$: Observable<AssociationModel[]>;

  constructor(public userService: UserService, private location: Location) {}

  ngOnInit() {
    this.userService.getUserAssociations();
    this.availableAssociations$ = this.userService.availableAssociations$;
    const selectedAssociationSubscription =
      this.userService.selectedAssociation$.subscribe((value: any) => {
        this.currentAssociation = value;
      });

    this.subscriptions.push(selectedAssociationSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.map((subscription) => {
      subscription.unsubscribe();
    });
  }

  selectAssociation(event: any, association: AssociationModel) {
    this.userService.setAssociation(association);
  }
}
