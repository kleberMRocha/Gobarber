import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddUserIdtoApontments1608952586893 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn('appointments', new TableColumn({
            name:'user_id',
            type:'varchar',
            isNullable:true,
        }));

        await queryRunner.createForeignKey('appointments',
        new TableForeignKey({
            name:'appointmentsUser',
            columnNames:['user_id'],
            referencedTableName:'users',
            referencedColumnNames:['id'],
            onDelete:'SET NULL',
            onUpdate:'CASCADE',

        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments','appointmentsUser');
        await queryRunner.dropColumn('appointments', 'user_id');
    }

}
