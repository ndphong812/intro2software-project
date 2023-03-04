import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    ManyToOne,
    PrimaryColumn
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";

@Entity()
@Unique(["user_id", "email"])
export class User {


    @PrimaryColumn()
    @Length(1, 20)
    user_id!: string;

    @Column()
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

    hashPassword() {
        this.hasspass = bcrypt.hashSync(this.hasspass, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.hasspass);
    }

}