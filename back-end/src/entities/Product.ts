import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";

@Entity()
@Unique(["product_id"])
export class Product {

    @PrimaryGeneratedColumn()
    @Length(1, 20)
    product_id!: string;

    @Column()
    @Length(1, 20)
    owner_id!: string;

    @Column()
    sale_price!: number;

    @Column()
    @Length(1, 100)
    name!: string;

    @Column()
    @Length(1, 1000)
    detail!: string;

    @Column()
    stock!: number;

    @Column()
    original_price!: number;

    @Column()
    @Length(1, 200)
    image_link!: string;

    @Column()
    average_rate!: number;

    @Column()
    sol_amount!: number;

    @Column()
    @Length(1, 10)
    type!: string;

    @Column()
    available!: boolean;

    @Column()
    accept!: boolean;
}