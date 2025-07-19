import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNumber } from "class-validator"

export class PriceSelectOneRequest {
    @ApiProperty({ required: false, type: Number})
    @Type(() => Number)
    @IsNumber()
    public id: number
}