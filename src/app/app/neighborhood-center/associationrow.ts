// model for Neighborhood Center's association row
export class AssociationRow {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  property_count: number;
  property_list: string[] | null;
  owner_count: number;
  owner_list: string[] | null;
}