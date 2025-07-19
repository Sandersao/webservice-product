import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNumber, IsOptional, IsString } from "class-validator"

export class ProductUpdateRequest {
    @ApiProperty({ required: false, type: Number})
    @Type(() => Number)
    @IsNumber()
    id?: number

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    name: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    discription?: string
}