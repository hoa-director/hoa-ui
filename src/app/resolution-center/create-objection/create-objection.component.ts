import { Component, OnInit } from '@angular/core';
import { ResolutionCenterService } from '../resolution-center.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-objection',
  templateUrl: './create-objection.component.html',
  styleUrls: ['./create-objection.component.css'],
})
export class CreateObjectionComponent implements OnInit {
  objection: {
    against: number;
    comment: string;
  };
  units: any[];

  constructor(private resolutionCenterService: ResolutionCenterService, private userService: UserService) {}

  ngOnInit() {
    this.init();
    this.userService.selectedAssociation$.subscribe(() => {
      this.init();
    });
  }

  private init () {
    this.objection = {
      against: 0,
      comment: '',
    };
    this.resolutionCenterService.getUnits().subscribe((response) => {
      this.units = response.units;
    });
  }

  public submit(objection) {
    this.resolutionCenterService
      .submitObjection(objection)
      .subscribe((response) => {
      });
  }
}
