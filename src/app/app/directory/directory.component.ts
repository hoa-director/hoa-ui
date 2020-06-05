import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-directory",
  templateUrl: "./directory.component.html",
  styleUrls: ["./directory.component.css"],
})
export class DirectoryComponent implements OnInit {
  units: Array<{
    addressLineOne: string;
    addressLineTwo?: string;
    city: string;
    state: string;
    zip: number;
    user: {
      email: string;
      phone: string;
      fullName: string;
      firstName: string;
      lastName: string;
    };
  }> = [];

  isLoading: boolean;

  constructor(
    private dataService: DataService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.init();
    this.userService.currentAssociationUpdated.subscribe(() => {
      this.init();
    });
  }

  init() {
    this.isLoading = true;
    this.units = [];
    this.dataService.getDirectory().subscribe((response: any) => {
      this.isLoading = false;
      this.units = response.units;
    });
  }
}
