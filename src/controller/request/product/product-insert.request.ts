import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class ProductInsertRequest {
    @ApiProperty({ required: false })
    @IsString()
    name: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    discription?: string
}