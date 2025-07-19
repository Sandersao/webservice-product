import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tb_test")
export class Test {
    @PrimaryGeneratedColumn()
    id: number

    @Column({name: "test_string"})
    testString: string

    @Column({name: "test_number"})
    testNumber: number

    @Column({name: "test_boolean"})
    testBoolean: boolean
}