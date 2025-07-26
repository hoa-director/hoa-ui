import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTable } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { NeighborhoodCenterService } from "../../../services/neighborhood-center.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AssociationRow } from "../associationrow";  // -- MODEL
import { NeighborhoodDetailsComponent } from "../neighborhood-details/neighborhood-details.component";


@Component({
  selector: 'app-neighborhood-view',
  templateUrl: './neighborhood-view.component.html',
  styleUrls: ['./neighborhood-view.component.css']
})

export class NeighborhoodViewComponent implements OnInit {
  @ViewChild("neighborhoodTable") neighborhoodTable: MatTable<any>;

  public displayedColumns: string[] = [
    'name',
    'createdAt', 
    'updatedAt',
    'propertyCount',
    'ownerCount',
    'viewButton',
    'editButton', 
  ];

  public neighborhoodRows: AssociationRow[] = [];

  constructor(
    private router: Router,
    private neighborhoodCenterService: NeighborhoodCenterService,
    private fb: FormBuilder,
    public detailDialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchNeighborhoods();
  }

  fetchNeighborhoods() {
    // this.neighborhoodCenterService.fetchNeighborhoods()
    //   .subscribe((responseData: any) => {
    //     this.neighborhoodRows = responseData.associations;
    //   }, (error: any) => {
    //     console.log('Error fetching neighborhoods:', error);
    //   });
  }

  goToAddNeighborhood() {
    this.router.navigate(['/home/neighborhood-center/neighborhood-add']);
  }

  viewNeighborhood(association: AssociationRow) {
    if (association) {
      this.detailDialog.open(NeighborhoodDetailsComponent, {
        width: '500px',
        data: { association },
      });
    } else {
      return;
    }
  }

  editNeighborhood(associationId: number) {
    if (associationId){
      this.router.navigate([`/home/neighborhood-center/neighborhood-edit/${associationId}`]);
    } else {
      return;
    }
  }
}
