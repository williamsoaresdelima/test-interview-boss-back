import { Profile } from "../../profiles/entities/profile.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Message')
export class Message {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	content: string;

	@Column()
	sender_id: number;

	@ManyToOne(() => Profile, (profile) => profile.messages)
  	@JoinColumn({ name: "sender_id", referencedColumnName: "id" })
	sender: Profile;

	@Column()
	recipient_id: number;

	@Column()
	date: Date;
}
