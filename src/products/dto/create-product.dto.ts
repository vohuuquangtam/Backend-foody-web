import { IsNotEmpty } from 'class-validator'

export class CreateProductDto {
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