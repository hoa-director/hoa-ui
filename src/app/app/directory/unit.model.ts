export interface Unit {
    addressLineOne: string;
    addressLineTwo?: string;
    city: string;
    state: string;
    zip: number;
    user: {
      email: string;
      phone: string;
    //   fullName: string;
      firstName: string;
      lastName: string;
    };
  }  