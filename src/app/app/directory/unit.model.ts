import { User } from "./user.model"
export interface Unit {
    addressLineOne: string;
    addressLineTwo?: string;
    city: string;
    state: string;
    zip: number;
    user: User;
  }  