import {IsNotEmpty} from 'class-validator';

export class CreateReviewDto {
    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    userID : number;

    @IsNotEmpty()
    productId: number;

    
}