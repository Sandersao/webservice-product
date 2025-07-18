import { ApiProperty } from "@nestjs/swagger"
import { Transform, Type } from "class-transformer"
import { IsArray, IsNumber, IsOptional } from "class-validator"
import { FindOperator } from "typeorm"

export class PriceSelectRequest {
    @ApiProperty({ required: false, type: [Number]})
    @IsOptional()
    @Transform(({ value }) => {
        if(Array.isArray(value)){
            return value
        }
        if (typeof value == "object") {
            return Array.from(value)
        }

        if (typeof value != 'number') {
            return [parseInt(value)]
        }

        return [value]
    })
    @Type(() => Array<number>)
    @IsArray()
    public id?: number | Array<number>

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    minPrice?: number

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    maxPrice?: number

    price: FindOperator<number>

    @ApiProperty({ required: false, type: [Number]})
    @IsOptional()
    @Transform(({ value }) => {
        if(Array.isArray(value)){
            return value
        }
        if (typeof value == "object") {
            return Array.from(value)
        }

        if (typeof value != 'number') {
            return [parseInt(value)]
        }

        return [value]
    })
    @Type(() => Array<number>)
    @IsArray()
    productId: Array<number> | FindOperator<any>
}