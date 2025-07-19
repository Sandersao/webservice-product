import { Controller, Delete, Get, Post, Put, Query, ValidationPipe } from "@nestjs/common";
import { TestBusiness } from "src/business/test.business";
import { BodyResponseSystem } from "../system/body-response.system";
import { TestListRequest } from "src/request/test-list.request";
import { TestInsertRequest } from "src/request/test-insert.request";
import { TestUpdateRequest } from "src/request/test-update.request";
import { TestDeleteRequest } from "src/request/test-delete.request";
import { TestResponse } from "../response/test.response";

@Controller('test')
export class TestController {
    constructor(
        private readonly business: TestBusiness
    ) { }

    @Get()
    public async select(@Query(new ValidationPipe()) request: TestListRequest) {
        const testList = await this.business.select(request)
        return {
            message: 'Test list succesfully recoverred',
            data: testList
        } as BodyResponseSystem<TestResponse[]>
    }

    @Post()
    public async insert(@Query(new ValidationPipe()) request: TestInsertRequest) {
        const testList = await this.business.insert(request)
        return {
            message: 'Test succesfully registered',
            data: testList
        } as BodyResponseSystem<TestResponse>
    }

    @Put()
    public async update(@Query(new ValidationPipe()) request: TestUpdateRequest) {
        const testList = await this.business.update(request)
        return {
            message: 'Test list succesfully recoverred',
            data: testList
        } as BodyResponseSystem<TestResponse>
    }

    @Delete()
    public async delete(@Query(new ValidationPipe()) request: TestDeleteRequest) {
        const testList = await this.business.delete(request)
        return {
            message: testList ? 'Test list succesfully recoverred' : 'No test recovered for the filters informed',
            data: testList
        } as BodyResponseSystem<TestResponse>
    }
}