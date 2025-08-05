// model for Neighborhood Center's association row
export class AssociationRow {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  propertyCount: number;
  units: string[] | null;
  ownerCount: number;
  users: string[] | null;
}