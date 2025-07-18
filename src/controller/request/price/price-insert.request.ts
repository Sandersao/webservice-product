import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNumber } from "class-validator"

export class PriceInsertRequest {
    @ApiProperty({ required: false })
    @Type(() => Number)
    @IsNumber()
    price: number

    @ApiProperty({ required: false, type: [Number]})
    @Type(() => Number)
    @IsNumber()
    productId: number
}