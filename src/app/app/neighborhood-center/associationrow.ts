// model for Neighborhood Center's association row
export class AssociationRow {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  propertyCount: number;
  propertyList: string[] | null;
  ownerCount: number;
  ownerList: string[] | null;
}