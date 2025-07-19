import { Test } from "src/model/test"
import { PromiseInterruptionException } from "src/exeption/promise-interruption.exception"
import { makeConfigSystem } from "src/system/config.system"
import { makeTextTransformSystem } from "src/system/text-transform.sysem"
import { DataSource, InsertResult, Repository } from "typeorm"

export class TestDataInitialization {
    public start(dataSource: DataSource) {
        const test = new Test()

        test.testString = makeTextTransformSystem().toUpper('Test')!
        test.testNumber = 1
        test.testBoolean = true

        const repository: Repository<Test> = dataSource.getRepository(Test)

        repository.findOneBy(test)
            .then((testFetched: Test | null) => {
                if (testFetched) {
                    throw new PromiseInterruptionException('Interrupção da promise pois o registro de testes já está persistido')
                }
                return testFetched
            })
            .then(() => {
                return repository.insert(test)
            })
            .then(async (insertResult: InsertResult) => {
                const insertList: Test[] = []
                for (const i in insertResult.generatedMaps) {
                    const map = insertResult.generatedMaps[i] as Test
                    const test = await repository.findOneBy(map)
                    if (test) {
                        insertList.push(test)
                    }
                }
                return insertList
            })
            .catch((err: PromiseInterruptionException) => {
                if (makeConfigSystem().productionMode) {
                    console.debug(err)
                }
            })
    }
}