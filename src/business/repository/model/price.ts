import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "./product"

@Entity('tb_price')
export class Price {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    price: number

    @Column({ name: 'creation_date', default: () => 'CURRENT_TIMESTAMP' })
    creationDate: Date

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'id_product' })
    productId: number
}