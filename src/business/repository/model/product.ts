import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tb_product')
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ nullable: true })
    discription?: string

    @Column({ name: 'creation_date', default: () => 'CURRENT_TIMESTAMP' })
    creationDate: Date
}