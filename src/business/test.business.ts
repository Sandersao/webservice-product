import { Injectable, NotFoundException } from "@nestjs/common";
import { TestRepository } from "./repository/test.repository";
import { TestListRequest } from "src/request/test-list.request";
import { TestInsertRequest } from "src/request/test-insert.request";
import { TestUpdateRequest } from "src/request/test-update.request";
import { TestDeleteRequest } from "src/request/test-delete.request";
import { NoContentException } from "src/exeption/no-content.exception";

@Injectable()
export class TestBusiness {
    constructor(
        private readonly repository: TestRepository
    ) { }

    public async select(request: TestListRequest) {
        const testList = await this.repository.select(request)

        if (testList.length == 0) {
            throw new NoContentException('No test recovered for the informed filters')
        }

        return testList
    }

    public async insert(request: TestInsertRequest) {
        return this.repository.insert(request)
    }

    public async update(request: TestUpdateRequest) {
        const test = await this.repository.selectOne(request)
        if (!test) {
            throw new NotFoundException('Test not found for update')
        }
        return this.repository.update(request)
    }

    public async delete(request: TestDeleteRequest) {
        const test = await this.repository.selectOne(request)
        if (!test) {
            throw new NotFoundException('Test not found for delete')
        }
        return this.repository.delete(request)
    }
}