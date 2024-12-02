import { User } from "./user.model"
export interface Unit {
    // unitId: number | null;  
    associationId: number
    addressLineOne: string;
    addressLineTwo?: string;
    city: string;
    state: string;
    zip: number;
    deletedAt?: boolean;
    // email?: string | null
    // user: User;
  }  