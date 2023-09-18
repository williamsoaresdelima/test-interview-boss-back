import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateChat1694826125245 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'Chat',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'message',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'sender',
						type: 'int'
					},
					{
						name: 'recipient',
						type: 'int'
					},
					{
						name: 'date',
						type: 'timestamp',
						default: 'now()'
					}
				]
			}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('Chat')
	}

}
