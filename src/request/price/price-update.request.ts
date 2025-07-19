import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNumber, IsOptional } from "class-validator"

export class PriceUpdateRequest {
    @ApiProperty({ required: false, type: Number})
    @Type(() => Number)
    @IsNumber()
    id?: number

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    price: number

    @ApiProperty({ required: false, type: [Number]})
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    productId: number
}