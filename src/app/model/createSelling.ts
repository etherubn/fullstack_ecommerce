export class CreateSelling {
  id: number;
  user: {
    id: number;
    address: string;
    name: string;
    last_name: string;
    dni: string;
  };
  products: {
    idSellingProduct: number;
    quantity: number;
    product: {
      id: number;
    };
  }[];
}
