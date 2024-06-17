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
        name: "Open Motions (Inbox)",
        path: "inbox",
      },

      // ---- REMOVING "Outbox" PAGE/COMPONENT ----
      // {
      //   name: "Open Motions (Outbox)",
      //   path: "outbox",
      // },
      {
        name: "Past Motions",
        path: "past",
      },
      {
        name: "File Motion",
        path: "objection/create",
      },
    ];
  }

  ngOnInit() {}
}
