import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Product extends Model {
    @Column
    orderId: number;

    @Column
    productName: string;

    @Column
    productId: number;

    @Column({ defaultValue: true })
    isActive: boolean;
}
