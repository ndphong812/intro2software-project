import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    OneToOne,
    JoinColumn,
    PrimaryColumn
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";

import { User } from './User';
import { Product } from './Product';


@Entity()
@Unique(["order_id"])
export class Ordered {

    @PrimaryColumn()
    @Length(1, 20)
    order_id!: string;

    @Column()
    @OneToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product_id!: string;
    
    @Column()
    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    customer_id!: string;

    @Column()
    @IsNotEmpty()
    amount!: number;

    @Column()
    date_time!: Date;


    @Column()
    @Length(0, 200)
    note!: Date;
}