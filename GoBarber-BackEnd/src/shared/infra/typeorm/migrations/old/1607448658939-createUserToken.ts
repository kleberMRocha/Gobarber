import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUserToken1607448658939 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table(
            {
                name: 'user_token',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'token',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'user_id',
                        type: 'varchar',
                    },
                    {
                        name:'created_at',
                        type:'timestamp',
                        default:'now()',
                    },
                    {
                        name:'updated_at',
                        type:'timestamp',
                        default:'now()',
                    }

                ],
                foreignKeys: [
                    {
                        name:'tokenUser',
                        referencedTableName:'users',
                        referencedColumnNames:['id'],
                        columnNames:['user_id'],
                        onDelete:'CASCADE',
                        onUpdate:'CASCADE',
                    }
                ],
            }
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_token');
    }
}
