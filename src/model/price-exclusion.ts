import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Price } from "./price";

@Entity('ex_price', { schema: 'excusion' })
export class PriceExclusion {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    date: Date

    @OneToOne(() => Price)
    @JoinColumn({ name: 'price_id' })
    priceId: number
}