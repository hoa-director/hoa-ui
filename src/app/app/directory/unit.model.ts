import { User } from "./user.model"
export interface Unit {
    // unitId: number | null;  
    associationId: number;
    associationName?: string;
    addressLineOne: string;
    addressLineTwo?: string | null;
    city: string;
    state: string;
    zip: number;
    deletedAt?: Date | null;
    userId?: number | null;
    // email?: string | null
    // user: User;
  }  