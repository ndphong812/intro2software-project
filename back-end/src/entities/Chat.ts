import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    ManyToMany,
    ManyToOne,
    JoinTable,
    JoinColumn,
    PrimaryColumn 
    

} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import { User } from './User';


@Entity()
export class Chat {
    @PrimaryColumn()
    @ManyToOne(() => User)
    @JoinColumn({referencedColumnName: 'user_id'})
    from_id!: string;

    @PrimaryColumn()
    @ManyToOne(() => User)
    @JoinColumn({referencedColumnName: 'user_id'})
    to_id!: string;


    @PrimaryColumn()
    datetime!: Date;

    @Column()
    @Length(0, 1000)
    content!: string;
}