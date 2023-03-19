import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    ManyToMany,
    JoinColumn,
    PrimaryColumn
    

} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import { User } from './User';


@Entity()
export class Chat {
    @PrimaryColumn()
    @ManyToMany(() => User)
    @JoinColumn({ name: 'from_id' })
    from_id!: string;

    // @Column({ name: 'from_id_1' })
    // fromId!: String;

    @PrimaryColumn()
    @ManyToMany(() => User)
    @JoinColumn({ name: 'to_id' })
    to_id!: string;

    // @Column({ name: 'to_id_1' })
    // toId!: String;

    @PrimaryColumn()
    datetime!: Date;

    @Column()
    @Length(0, 1000)
    content!: string;
}