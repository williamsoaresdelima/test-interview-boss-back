import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateProfile1694823275357 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'Profile',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'email',
						type: 'varchar',
						isUnique: true,
						isNullable: false,
					},
					{
						name: 'password',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'name',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'type',
						type: 'varchar'
					},
					{
						name: 'description',
						type: 'varchar'
					},
					{
						name: 'phone_number',
						type: 'varchar'
					},
				]
			}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('Profile');
	}

}
