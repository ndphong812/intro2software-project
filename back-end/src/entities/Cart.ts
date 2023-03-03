import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    ManyToOne,
    ManyToMany,
    JoinColumn
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";

import { User } from './User';
import { Product } from './Product';


@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    @ManyToMany(() => User)
    @JoinColumn({ name: 'user_id_1' })
    user_id!: User;

    @Column({ name: 'user_id_1' })
    customesId!: String;

    @PrimaryGeneratedColumn()
    @ManyToMany(() => Product)
    @JoinColumn({ name: 'product_id_1' })
    product_id!: Product;

    @Column({ name: 'product_id_1' })
    productId!: String;

    @Column()
    @IsNotEmpty()
    amount!: number;

}