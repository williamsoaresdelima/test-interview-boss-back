import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { ProfileTypeEnum } from "../../../shared/enums/profile-type";

export class GetProfilesDto {
    @IsOptional()
	@ApiProperty({
		nullable: true,
        default: ProfileTypeEnum.ALL,
        enum: ProfileTypeEnum
	})
	type?: string | null;
}
