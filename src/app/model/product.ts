export class Product {
    type: string;
    code_branch: string;
    name: string;
    price: number;
    stock: number;
    description: string;
    category: { id: number };
    brand: { id: number };
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
}