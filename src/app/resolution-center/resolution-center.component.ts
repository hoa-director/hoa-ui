import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-resolution-center",
  templateUrl: "./resolution-center.component.html",
  styleUrls: ["./resolution-center.component.css"],
})
export class ResolutionCenterComponent implements OnInit {
  resolutionCenterLinks: any[];
  activeLink: string;

  constructor() {
    this.resolutionCenterLinks = [
      {
        name: "Inbox",
        path: "inbox",
      },
      {
        name: "Outbox",
        path: "outbox",
      },
      {
        name: "Past Objections",
        path: "past",
      },
      {
        name: "File Objection",
        path: "objection/create",
      },
    ];
  }

  ngOnInit() {}
}
