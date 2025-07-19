import { In, Like, Repository } from 'typeorm'
import { Product } from '../../model/product'
import { Injectable } from '@nestjs/common'
import { makeConfigSystem } from 'src/system/config.system'
import { makeTextTransformSystem, TextTransformSystem } from 'src/system/text-transform.sysem'
import { ProductSelectRequest } from 'src/request/product/product-select.request'
import { ProductSelectOneRequest } from 'src/request/product/product-select-one.request copy'
import { ProductInsertRequest } from 'src/request/product/product-insert.request'
import { ProductUpdateRequest } from 'src/request/product/product-update.request'
import { ProductDeleteRequest } from 'src/request/product/product-delete.request'
import { ProductExclusion } from '../../model/product-exclusion'

@Injectable()
export class ProductRepository {
    private readonly textTransform: TextTransformSystem = makeTextTransformSystem()
    private readonly model: Repository<Product> = makeConfigSystem()
        .getDataSource()
        .getRepository(Product)
    private readonly exclusionModel: Repository<ProductExclusion> = makeConfigSystem()
        .getDataSource()
        .getRepository(ProductExclusion)

    public async select(request: ProductSelectRequest): Promise<Product[]> {
        if (request.id) {
            request.id = In(request.id as any) as any
        }
        if (request.name) {
            request.name = Like(`%${this.textTransform.toUpper(request.name)}%`) as any
        }

        if (request.discription) {
            request.discription = Like(`%${this.textTransform.toUpper(request.discription)}%`) as any
        }
        return this.model.findBy(request)
    }

    public async selectOne(request: ProductSelectOneRequest): Promise<Product | null> {
        return this.model.findOneBy(request)
    }

    public async insert(request: ProductInsertRequest): Promise<Product> {
        const product = new Product()
        product.name = this.textTransform.toUpper(request.name)!
        if (request.discription) {
            product.discription = this.textTransform.toUpper(request.discription)
        }
        return this.model.save(product)
    }

    public async update(request: ProductUpdateRequest): Promise<Product> {
        return this.model.findOneBy({ id: request.id })
            .then((product: Product) => {
                if (request.name) {
                    product.name = this.textTransform.toUpper(request.name)!
                }
                if (request.discription) {
                    product.discription = request.discription
                }
                return product
            })
            .then((product: Product) => {
                return this.model.save(product)
            })
    }

    public async delete(request: ProductDeleteRequest): Promise<Product| null> {
        const product: Product | null = await this.model.findOneBy({ id: request.id })
        if(!product){
            return null
        }
        const exclusion = new ProductExclusion()
        exclusion.productId = request.id!
        this.exclusionModel.save(exclusion)
        return product
    }
}