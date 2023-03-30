import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    OneToOne,
    JoinColumn,
    PrimaryColumn,
    ManyToMany
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";

import { Product } from './Product';
import { Ordered } from './Ordered';

@Entity()
export class Comment {
    @PrimaryColumn()
    @ManyToMany(() => Ordered)
    @JoinColumn({ name: 'order_id' })
    order_id!: string;

    // @Column({ name: 'order_id_2' })
    // orderId!: String;

    @PrimaryColumn()
    @ManyToMany(() => Product)
    @JoinColumn({ name: 'product_id' })
    product_id!: string;

    // @Column({ name: 'product_id' })
    // productId!: String;

    @Column()
    rate!: number;

    @Column()
    @Length(1, 200)
    sample_link!: string;

    @Column()
    @Length(1, 1000)
    comment_content!: string;
}
