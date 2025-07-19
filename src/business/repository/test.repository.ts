import { In, Like, Repository } from 'typeorm'
import { Test } from '../../model/test'
import { Injectable } from '@nestjs/common'
import { makeConfigSystem } from 'src/system/config.system'
import { TestListRequest } from 'src/request/test-list.request'
import { TestInsertRequest } from 'src/request/test-insert.request'
import { TestUpdateRequest } from 'src/request/test-update.request'
import { TestDeleteRequest } from 'src/request/test-delete.request'
import { TestSelectOneRequest } from 'src/request/test-select-one.request copy'
import { makeTextTransformSystem } from 'src/system/text-transform.sysem'

@Injectable()
export class TestRepository {
    private readonly model: Repository<Test> = makeConfigSystem()
        .getDataSource()
        .getRepository(Test)

    public async select(request: TestListRequest): Promise<Test[]> {
        if(request.id){
            request.id = In(request.id as any) as any
        }
        if (request.testString) {
            request.testString = Like(`%${makeTextTransformSystem().toUpper(request.testString)}%`) as any
        }
        return this.model.findBy(request)
    }

    public async selectOne(request: TestSelectOneRequest): Promise<Test | null> {
        return this.model.findOneBy(request)
    }

    public async insert(request: TestInsertRequest): Promise<Test> {
        const test = new Test()
        test.testString = makeTextTransformSystem().toUpper(request.testString)!
        test.testNumber = request.testNumber
        test.testBoolean = request.testBoolean
        return this.model.save(test)
    }

    public async update(request: TestUpdateRequest): Promise<Test> {
        return this.model.findOneBy({ id: request.id })
            .then((test: Test) => {
                if (request.testString) {
                    test.testString = makeTextTransformSystem().toUpper(request.testString)!
                }
                if (request.testNumber) {
                    test.testNumber = request.testNumber
                }
                if (request.testBoolean) {
                    test.testBoolean = request.testBoolean
                }
                return test
            })
            .then((test: Test) => {
                return this.model.save(test)
            })
    }

    public async delete(request: TestDeleteRequest): Promise<Test> {
        return this.model.findOneBy({ id: request.id })
            .then((test: Test) => {
                return this.model.remove(test)
            })
    }
}