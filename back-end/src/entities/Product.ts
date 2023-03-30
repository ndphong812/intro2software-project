import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    PrimaryColumn,
    ManyToMany,
    JoinTable,
    JoinColumn,
    ManyToOne
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import { User } from './User';


@Entity()
// @Unique(["product_id"])
export class Product {

    @PrimaryColumn()
    @Length(1, 20)
    product_id!: string;

    @Column()
    @ManyToOne(() => User)
    @JoinColumn({ name: 'owner_id' })
    owner_id!: string;

    // @Column()
    // @Length(1, 20)
    // owner_id!: string;

    @Column()
    original_price!: number;

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
    @Length(1, 200)
    image_link!: string;

    @Column({ nullable: true, type: "float" })
    average_rate!: number;

    @Column()
    sold_amount!: number;

    @Column()
    @Length(1, 10)
    type!: string;

    @Column()
    @Length(1, 10)
    brand!: string;

    @Column()
    available!: boolean;

    @Column()
    accept!: boolean;

    init(product_id: string, owner_id: string, original_price: number, sale_price: number, name: string,
        detail: string, stock: number, image_link: string, average_rate: number, sold_amount: number, type: string,
        brand: string, available: boolean, accept: boolean) {
        this.original_price = original_price;
        this.sale_price = sale_price;
        this.name = name;
        this.detail = detail;
        this.image_link = image_link;
        this.stock = stock;
        this.average_rate = average_rate;
        this.sold_amount = sold_amount;
        this.type = type;
        this.brand = brand;
        this.available = available;
        this.accept = accept;
        this.product_id = product_id;
        this.owner_id = owner_id;
    }
}