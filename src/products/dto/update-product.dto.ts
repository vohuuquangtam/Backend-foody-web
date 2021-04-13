import { IsNotEmpty } from "class-validator"

export class UpdateProductDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    image: string[];

    @IsNotEmpty()
    price: number;

    
    description: string;

    @IsNotEmpty()
    quantity: number;

    category: string;
}