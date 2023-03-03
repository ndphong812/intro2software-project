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

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    @JoinColumn({ name: 'from_id_3' })
    @ManyToMany(() => User)
    from_id!: User;

    @Column({ name: 'from_id_3' })
    fromId!: String;

    @PrimaryGeneratedColumn()
    @ManyToMany(() => User)
    @JoinColumn({ name: 'to_id_3' })
    to_id!: User;

    @Column({ name: 'to_id_3' })
    toId!: String;

    @PrimaryGeneratedColumn()
    datetime!: Date;

    @Column()
    @Length(0, 1000)
    content!: string;

} 