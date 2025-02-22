import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";
import { uuid } from "uuidv4";

export default class CreateAppointments1604574895577 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table(
            {
                name:'appointments',
                    columns:[{
                        name:'id',
                        type:'varchar',
                        isPrimary:true,
                        generationStrategy:'uuid',
                        default:'uuid_generate_v4()'
                    },
                    {
                        name:'provider_id',
                        type:'varchar',
                        isNullable:true,

                    },
                    {
                        name:'date',
                        type:'timestamp with time zone',
                        isNullable:false,
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
                ]
            },

        ));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments');
    }

}
