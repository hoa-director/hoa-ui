import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { Location } from "@angular/common";
import { UserService } from "../../services/user.service";
import { BehaviorSubject, ReplaySubject } from "rxjs";

@Component({
  selector: "app-association-switch",
  templateUrl: "./association-switch.component.html",
  styleUrls: ["./association-switch.component.css"],
})
export class AssociationSwitchComponent implements OnInit, OnDestroy {
  subscriptions = [];
  // associationsReplaySubject = new ReplaySubject<[{id: string, name: string}]>(1);
  associations: { id: string; name: string }[] = [];
  currentAssociation: string;

  constructor(public userService: UserService, private location: Location) {}

  ngOnInit() {
    this.init();
    const selectedAssociationSubscription = this.userService.selectedAssociation
    .subscribe(
      (value: any) => {
        this.currentAssociation = value;
      }
    );

    const userAssociations = this.userService.availableAssociations
    .subscribe(
      (value: any) => {
        this.associations = value.associations;
      }
    );

    this.subscriptions.push(
      selectedAssociationSubscription,
      userAssociations
    );
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscriptions.map((subscription) => {
      subscription.unsubscribe();
    });
  }

  // ngAfterViewInit(){
  //   this.currentAssociation = this.associations[0].id
  // }

  private init() {
    this.userService.getUserAssociations();
  }

  selectAssociation(associationId) {
    this.userService.setAssociation(associationId.value)
  }
}
