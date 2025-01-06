export class Product {
    idProduct: number;
    product_code: string;
    type: string;
    code_branch: string;
    name: string;
    price: number;
    stock: number;
    description: string;
    category: { id: number, type: string };
    brand: { id: number, name: string };
    pet_type: string;
    image_product: string;
    // food
    weight: number;
    refrigeration: boolean;
    food_type: string;
    // accesory
    hypoallergenic: boolean;
    accesory_type: string;
    // hygiene
    volume: number;
    hygiene_type: string;
    cantidad?: number;
}