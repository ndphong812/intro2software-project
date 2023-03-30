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
// @Unique(["user_id", "email"])
export class User {

    @PrimaryColumn()
    @Length(1, 20)
    user_id!: string;

    @Column()
    @Length(6, 50)
    email!: string;

    @Column({ nullable: true })
    @Length(0, 200)
    address!: string;

    @Column({ nullable: true })
    @Length(0, 10)
    phone!: string ;

    @Column({ nullable: true })
    @Length(0, 200)
    avatar_link!: string;

    @Column({ nullable: true })
    @Length(0, 50)
    fullname!: string;

    @Column()
    @Length(1, 100)
    @IsNotEmpty()
    hashpass!: string;

    @Column()
    @IsNotEmpty()
    @Length(0, 10)
    role!: string;


    init(user_id: string, email: string, address: string, phone: string, avatar_link: string,
        fullname: string, hashpass: string, role: string) {
        this.user_id = user_id;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.avatar_link = avatar_link;
        this.fullname = fullname;
        this.hashpass = hashpass;
        this.role = role;
    }

    hashPassword() {
        this.hashpass = bcrypt.hashSync(this.hashpass, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.hashpass);
    }

}