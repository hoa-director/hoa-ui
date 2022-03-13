export interface Objection {
  id: number;
  comment: string;
  createdAt: string;
  submittedByUser: {
    id: number;
    units: { addressLineOne: string }[];
  };
  submittedAgainstUser: {
    id: number;
    units: { addressLineOne: string }[];
  };
}
