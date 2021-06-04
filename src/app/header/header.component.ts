import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssociationModel } from 'app/models/association.model';
import { UserModel } from 'app/models/user.model';
import { Subscription } from 'rxjs';
import { Observable, Observer } from 'rxjs';
import { UserService } from "../services/user.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit{
  loggedInUser$: Observable<string> | null = null;
  selectedAssociation$: Observable<string>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getLoggedInUser();
    this.loggedInUser$ = this.userService.user$;
    this.selectedAssociation$ = this.userService.selectedAssociation$;
  }
}
