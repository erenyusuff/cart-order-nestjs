import {IsNotEmpty, IsNumber, IsString} from 'class-validator';


export class CreateProductDto {

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsNotEmpty()
    productName: string;

    @IsNumber()
    @IsNotEmpty()
    stock: number;

}
