import {OrderInterface} from './Order'
import {Currency} from '../Types'

export default interface ExchangeClientInterface {
  getOrders(fromCurrency?: Currency,
            toCurrency?: Currency,
            status?: string,
            limit?: number | void,
            since?: number | void) : any
  createOrder(order: OrderInterface): any
}
