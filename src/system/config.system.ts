import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { config } from "dotenv";
import { dataInitialization } from "src/business/adapter/data-initialization/_data-initialization";
import { modelList } from "src/model/_model-list";
import { DataSource, DataSourceOptions } from "typeorm";
config()

type Enviroment = 'PRODUCTION' | 'HOMOLOGATION' | 'DEVELOPMENT'

export class ConfigSystem {
    public environment: Enviroment = (process.env.ENVIRONMENT! ?? 'PRODUCTION') as Enviroment
    public productionMode: boolean = this.environment == 'PRODUCTION'
    public port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000
    public title: string = process.env.TITLE ?? 'Not named API'
    public description: string = process.env.DISCRIPTION ?? 'A test discription'
    public tagList: Array<string> = process.env.TAG_LIST?.split(',') ?? ['test', 'poc']

    public databasePath: string = process.env.DATABASE_PATH ?? `${__dirname}/../../database/`
    public databaseFile: string = process.env.DATABASE_FILE ?? `database.sqlite`

    private dataSource: DataSource
    private application: INestApplication<any>

    public bootstrap() {
        this.swagger()
        this.provedorHttp()
        this.databaseBootstrap()
    }

    public getApplication(application?: INestApplication<any>) {
        if (!this.application && application) {
            this.application = application
        }
        return this.application
    }


    private swagger() {
        const swaggerConfigrer = new DocumentBuilder()
            .setTitle(this.title)
            .setDescription(this.description)

        for (const i in this.tagList) {
            const tag = this.tagList[i];
            swaggerConfigrer.addTag(tag)
        }

        const swaggerConfig = swaggerConfigrer.build()
        SwaggerModule.setup('api', this.getApplication(), () => SwaggerModule.createDocument(this.getApplication(), swaggerConfig))
    }

    private async provedorHttp() {
        return await this.getApplication().listen(
            this.port,
            () => {
                if (!this.productionMode) {
                    console.info(`Application ruinning on door ${this.port}`)
                }
            }
        )
    }

    public getDataSource() {
        if (!this.dataSource) {
            let databseOption: DataSourceOptions = {
                type: 'sqlite',
                database: this.databasePath + this.databaseFile,
                entities: [...modelList],
                synchronize: !this.productionMode,
                logging: !this.productionMode
            }
            this.dataSource = new DataSource(databseOption)
        }
        return this.dataSource
    }

    private async databaseBootstrap() {
        await this.getDataSource()
            .initialize()
            .catch((error) => console.error(error))

        if (!this.productionMode) {
            console.debug(this.getDataSource().options)
        }

        await dataInitialization(this.getApplication(), this.getDataSource())
    }
}

let configSystem: ConfigSystem

export const makeConfigSystem = (): ConfigSystem => {
    if(!configSystem){
        configSystem = new ConfigSystem()
    }
    return configSystem
}