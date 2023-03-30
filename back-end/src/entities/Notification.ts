import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    ManyToOne,
    ManyToMany,
    JoinTable,
    JoinColumn,
    PrimaryColumn
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";

import { User } from './User';

@Entity()
export class Notification {
    @PrimaryColumn()
    @ManyToMany(() => User)
    @JoinColumn({ name: 'from_id' })
    from_id!: string;

    // @Column({ name: 'from_id' })
    // fromId!: String;

    @PrimaryColumn()
    @ManyToMany(() => User)
    @JoinColumn({ name: 'to_id' })
    to_id!: string;

    // @Column({ name: 'to_id' })
    // toId!: String;

    @PrimaryColumn()
    datetime!: Date;

    @Column({ nullable: true })
    @Length(0, 1000)
    content!: string;

} 