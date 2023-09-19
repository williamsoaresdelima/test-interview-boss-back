import * as bcrypt from 'bcrypt'
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Profile')
export class Profile {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;
    
    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    type: string;

    @Column()
    phoneNumber: string;

    @Column()
    description: string;

    @Column()
    photo: string;

    @BeforeInsert()
    async hashPassword() {
        const encryptedPassword = await bcrypt.hash(this.password, 8)
        this.password = encryptedPassword
    }
}