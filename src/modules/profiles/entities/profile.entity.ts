import * as bcrypt from 'bcrypt';
import { Message } from "../../chat/entities/message.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
  description: string;

  @Column()
  phone_number: string;

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];

  @BeforeInsert()
  async hashPassword() {
    const encryptedPassword = await bcrypt.hash(this.password, 8);
    this.password = encryptedPassword;
  }
}
