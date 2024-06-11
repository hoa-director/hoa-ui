import { getLocaleDateTimeFormat } from "@angular/common";
import * as moment from "moment";
import { Observable } from "rxjs";


// -- model to use for the Users Page.
export class User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: number;
  created_at: Date;
  deleted_at: Date;

}
