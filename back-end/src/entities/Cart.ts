import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    ManyToOne,
    ManyToMany,
    JoinColumn,
    JoinTable,
    PrimaryColumn 
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";

import { User } from './User';
import { Product } from './Product';


@Entity()
export class Cart {
    @PrimaryColumn()
    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user_id!: string;

    @PrimaryColumn()
    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product_id!: string;

    @Column()
    @IsNotEmpty()
    amount!: number;

}