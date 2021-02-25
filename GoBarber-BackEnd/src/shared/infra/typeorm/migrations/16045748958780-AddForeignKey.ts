import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class AddForeignKey1604574895577 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            name:'AppointmentProvider',
            columnNames:['provider_id'],
            referencedTableName:'users',
            referencedColumnNames:['id'],
            onDelete:'SET NULL',
            onUpdate:'CASCADE',
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments','AppointmentProvider');
    }

}
