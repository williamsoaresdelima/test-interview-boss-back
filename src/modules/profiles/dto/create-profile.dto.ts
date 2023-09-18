import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProfileDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		nullable: false
	})
	email: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		nullable: false
	})
	name: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		nullable: false
	})
	password: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		nullable: false
	})
	type: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		nullable: false
	})
	description: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		nullable: false
	})
	phone_number: string;
}
