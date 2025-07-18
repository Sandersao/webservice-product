import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";

@Entity('ex_product', { schema: 'exclusion' })
export class ProductExclusion {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    date: Date

    @OneToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    productId: number
}