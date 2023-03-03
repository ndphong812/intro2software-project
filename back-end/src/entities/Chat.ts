import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    ManyToMany,
    JoinColumn

} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import { User } from './User';


@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    @ManyToMany(() => User)
    @JoinColumn({ name: 'from_id_1' })
    from_id!: User;

    @Column({ name: 'from_id_1' })
    fromId!: String;

    @PrimaryGeneratedColumn()
    @ManyToMany(() => User)
    @JoinColumn({ name: 'to_id_1' })
    to_id!: User;

    @Column({ name: 'to_id_1' })
    toId!: String;

    @PrimaryGeneratedColumn()
    datetime!: Date;

    @Column()
    @Length(0, 1000)
    content!: string;
}