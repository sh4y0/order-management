export interface Order {
  id?: string;
  clientId: number;
  clientName: string;
  productIds: number[];
  total?: number
}
