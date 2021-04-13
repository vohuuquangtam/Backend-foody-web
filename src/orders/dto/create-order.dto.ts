
import {IsNotEmpty} from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty()
    totalMoney: number;

    @IsNotEmpty()
    id_user: number;

    @IsNotEmpty()
    productOrder: {
        id_product: number,
        quantity: number
    }[];

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    phone: string;
}