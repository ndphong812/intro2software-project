import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    OneToOne,
    JoinColumn
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";

import { Product } from './Product';
import { Ordered } from './Ordered';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    @OneToOne(() => Ordered)
    @JoinColumn({ name: 'order_id_2' })
    order_id!: Ordered;

    @Column({ name: 'order_id_2' })
    orderId!: String;

    @PrimaryGeneratedColumn()
    @OneToOne(() => Product)
    @JoinColumn({ name: 'product_id_2' })
    product_id!: Product;

    @Column({ name: 'product_id_2' })
    productId!: String;

    @Column()
    rate!: number;

    @Column()
    @Length(1, 200)
    sample_link!: string;

    @Column()
    @Length(1, 1000)
    comment_content!: string;
}
