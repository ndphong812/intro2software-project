import {
    Entity,
    Column,
    OneToOne,
    JoinColumn,
    PrimaryColumn,
    ManyToOne,
    ManyToMany
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";

import { User } from './User';
import { Product } from './Product';


@Entity()

export class Ordered {

    @PrimaryColumn()
    @Length(1, 20)
    order_id!: string;

    @Column()
    @ManyToMany(() => Product)
    @JoinColumn({ name: 'product_id' })
    product_id!: string;
    
    @Column()
    @ManyToMany(() => User)
    @JoinColumn({ name: 'customer_id' })
    customer_id!: string;

    @Column()
    @IsNotEmpty()
    amount!: number;

    @Column()
    date_time!: Date;


    @Column()
    @Length(0, 200)
    note!: string;
}