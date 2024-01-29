import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {CreateOrderDto} from "./dto/create-order.dto";
import {Order} from "./models/order.model";
import {UpdateOrderDto} from "./dto/update-order.dto";
import {PaginateQueryInterface} from "../../core/database/paginate.intercase";
import {PaginationService} from "../../core/database/pagination.service";

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order)
        private readonly orderModel: typeof Order,
    ) {
    }

    create(createOrderDto: CreateOrderDto): Promise<Order> {
        return this.orderModel.create({
            userId: createOrderDto.userId,
            cartId: createOrderDto.cartId,
            price: createOrderDto.price,
            status: "waiting"
        });
    }

    update(updateOrderDto: UpdateOrderDto) {
        return this.orderModel.update({
            status: updateOrderDto.status
        }, {where: {id: updateOrderDto.id}})

    }

    async findAll(paginateQuery?: PaginateQueryInterface): Promise<Order[]> {
        console.log(paginateQuery)
        // return this.orderModel.findAll({
        //     include: [{
        //         association: 'user'
        //     }]
        // });
        return PaginationService.findAllPaginate({
            ...paginateQuery,
            model: this.orderModel
        });

    }

    findOne(id: string): Promise<Order> {
        return this.orderModel.findOne({
            where: {
                id,
            },
            include: [{
                association: 'cart',
                include: ['products']
            }]
        });
    }

    findCurrentUserOrders(userId: number) {
        return this.orderModel.findAll({
            where: {
                userId: userId,
                isActive: true
            },
            include: [{
                association: 'cart', include: [
                    {
                        association: 'cartProducts', include: ['product'],
                    }]
            }]
        })
    }

    async findCurrentUsersOrdersByToken(request) {
        const userId = request.user.userId;
        const cart = await this.findCurrentUserOrders(userId)
        return cart

        // async findAllOrdersOfUser(request) {
        //     const userId = request.user.userId
        //     const query = "SELECT * FROM Orders WHERE userId = :userId"
        //     const result = await this.orderModel.sequelize.query(query, {
        //         type: QueryTypes.SELECT,
        //         replacements: { userId: userId },
        //         raw: true,
        //     });
        //     return result

        // const userid = request.user.id
        // return this.orderModel.findOne({
        //     where: {
        //         userId : userid
        //     },
        //     include: [{
        //         association: 'cart',
        //         include: ['products']
        //     }]
        // });
    }

    async remove(id: string): Promise<void> {
        const order = await this.findOne(id);
        await order.destroy();
    }
}
