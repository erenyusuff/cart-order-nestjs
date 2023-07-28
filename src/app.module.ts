import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {UsersModule} from './modules/users/users.module';
import {OrdersModule} from './modules/orders/orders.module';
import {ProductsModule} from './modules/products/products.module';
import {CartModule} from './modules/cart/cart.module';
import {AuthModule} from './modules/auth/auth.module';
import {AuthGuard} from "./modules/auth/auth.guard";
import {APP_GUARD} from "@nestjs/core";
import {StatisticsModule} from './modules/statistics/statistics.module';

@Module({
    imports: [
        SequelizeModule.forRoot({
                dialect: 'mysql',
                host: '127.0.0.1',
                port: 3306,
                username: 'root',
                password: 'Yusuf4757',
                database: 'Cart_Order',
                autoLoadModels: true,
                synchronize: true,
            }
        ),
        UsersModule, OrdersModule, ProductsModule, CartModule, AuthModule, StatisticsModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule {
}
