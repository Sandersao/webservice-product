import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsBoolean, IsNumber, IsString } from "class-validator"

export class TestInsertRequest {
    @ApiProperty({ required: false })
    @IsString()
    public testString: string

    @ApiProperty({ required: false })
    @Type(() => Number)
    @IsNumber()
    public testNumber: number

    @ApiProperty({ required: false })
    @Type(() => Boolean)
    @IsBoolean()
    public testBoolean: boolean
}