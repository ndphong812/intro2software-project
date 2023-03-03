import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    ManyToOne
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";


@Entity()
@Unique(["user_id", "email"])
export class User {
    @PrimaryGeneratedColumn()
    @Length(1, 20)
    user_id!: string;

    @PrimaryGeneratedColumn()
    @Length(6, 50)
    email!: string;

    @Column()
    @Length(0, 200)
    address!: string;

    @Column()
    @Length(0, 10)
    phone!: string;

    @Column()
    @Length(0, 200)
    avatar_link!: string;

    @Column()
    @Length(0, 50)
    fullname!: string;

    @Column()
    @Length(1, 100)
    @IsNotEmpty()
    hasspass!: string;

    @Column()
    @IsNotEmpty()
    @Length(0, 10)
    role!: string;



}