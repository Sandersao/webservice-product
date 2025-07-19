import { Between, In, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm'
import { Price } from '../../model/price'
import { Injectable } from '@nestjs/common'
import { makeConfigSystem } from 'src/system/config.system'
import { PriceSelectRequest } from 'src/request/price/price-select.request'
import { PriceSelectOneRequest } from 'src/request/price/price-select-one.request copy'
import { PriceInsertRequest } from 'src/request/price/price-insert.request'
import { PriceUpdateRequest } from 'src/request/price/price-update.request'
import { PriceDeleteRequest } from 'src/request/price/price-delete.request'
import { PriceExclusion } from '../../model/price-exclusion'

@Injectable()
export class PriceRepository {
    private readonly model: Repository<Price> = makeConfigSystem()
        .getDataSource()
        .getRepository(Price)
    private readonly exclusionModel: Repository<PriceExclusion> = makeConfigSystem()
        .getDataSource()
        .getRepository(PriceExclusion)

    public async select(request: PriceSelectRequest): Promise<Price[]> {
        if (request.id) {
            request.id = In(request.id as any) as any
        }

        if (request.minPrice && !request.maxPrice) {
            request.price = MoreThanOrEqual(request.minPrice)
        }

        if (!request.minPrice && request.maxPrice) {
            request.price = LessThanOrEqual(request.maxPrice)
        }

        if (request.minPrice && request.maxPrice) {
            request.price = Between(request.minPrice, request.maxPrice)
        }

        delete request.maxPrice
        delete request.minPrice

        if (request.productId) {
            request.productId = In(request.productId)
        }
        return this.model.findBy(request as any)
    }

    public async selectOne(request: PriceSelectOneRequest): Promise<Price | null> {
        return this.model.findOneBy(request)
    }

    public async insert(request: PriceInsertRequest): Promise<Price> {
        const price = new Price()
        price.price = request.price
        price.productId = request.productId
        return this.model.save(price)
    }

    public async update(request: PriceUpdateRequest): Promise<Price> {
        return this.model.findOneBy({ id: request.id })
            .then((price: Price) => {
                if (request.price) {
                    price.price = request.price
                }
                if (request.productId) {
                    price.productId = request.productId
                }
                return price
            })
            .then((price: Price) => {
                return this.model.save(price)
            })
    }

    public async delete(request: PriceDeleteRequest): Promise<Price | null> {
        const price: Price | null = await this.model.findOneBy({ id: request.id })
        if(!price){
            return null
        }
        const exclusion = new PriceExclusion()
        exclusion.priceId = request.id!
        this.exclusionModel.save(exclusion)
        return price
    }
}