import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loggedIn: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.listenForEvents();
  }

  listenForEvents() {
    this.userService.isLoggedIn().subscribe((user) => {
      this.loggedIn = user;
      console.log(user);
    });
    console.log(this.loggedIn);
  }
}
