import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Chat')
export class Chat {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	message: string;

	@Column()
	sender: string;

	@Column()
	recipient: string;

	@Column()
	date: Date;
}
