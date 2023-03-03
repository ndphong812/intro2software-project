import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    OneToOne,
    JoinColumn
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";

import { User } from './User';
import { Product } from './Product';


@Entity()
@Unique(["order_id"])
export class Ordered {

    @PrimaryGeneratedColumn()
    @Length(1, 20)
    order_id!: string;

    // @Column()
    // @OneToOne(() => Product)
    // @JoinColumn({ name: 'product_id_4' })
    // product_id!: Product;

    // @Column({ name: 'product_id_4' })
    // productId!: String;
    
    // @Column()
    // @OneToOne(() => User)
    // @JoinColumn({ name: 'user_id' })
    // customer_id!: User;

    // @Column({ name: 'user_id' }) //err do khác tên
    // customesId!: String;
    @Column()
    @Length(1, 20)
    customer_id!: string;

    @Column()
    @Length(1, 20)
    product_id!: string;

    @Column()
    @IsNotEmpty()
    amount!: number;

    @Column()
    date_time!: Date;


    @Column()
    @Length(0, 200)
    note!: Date;
}