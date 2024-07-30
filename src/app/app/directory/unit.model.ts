import { User } from "./user.model"
export interface Unit {
    associationId: number
    addressLineOne: string;
    addressLineTwo?: string;
    city: string;
    state: string;
    zip: number;
    email?: string | null
    // user: User;
  }  