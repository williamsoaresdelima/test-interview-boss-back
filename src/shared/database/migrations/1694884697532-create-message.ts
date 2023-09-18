import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateMessage1694884697532 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
			new Table({
				name: 'Message',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'content',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'sender_id',
						type: 'int'
					},
					{
						name: 'recipient_id',
						type: 'int'
					},
					{
						name: 'date',
						type: 'timestamp',
						default: 'now()'
					}
				]
			}))
            await queryRunner.createForeignKey(
                "Message",
                new TableForeignKey({
                  name: 'fk_Profile_Sender_Message',
                  columnNames: ["sender_id"],
                  referencedColumnNames: ["id"],
                  referencedTableName: "Profile",
                  onDelete: "CASCADE",
                }),
              )
              await queryRunner.createForeignKey(
                "Message",
                new TableForeignKey({
                  name: 'fk_Profile_Recipient_Message',
                  columnNames: ["recipient_id"],
                  referencedColumnNames: ["id"],
                  referencedTableName: "Profile",
                  onDelete: "CASCADE",
                }),
              )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('Message', 'fk_Profile_Recipient_Message');
        await queryRunner.dropForeignKey('Message', 'fk_Profile_Sender_Message');
        await queryRunner.dropTable('Message');
    }

}
