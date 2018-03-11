import ExchangeClientInterface from '../entities/ExchangeClientInterface'
import BTCMarketsClient from '../entities/BTCMarketsClient'
import {Exchange} from '../Types'


export interface ExchangeClientFactoryInterface {
  getByType(type: Exchange) : ExchangeClientInterface
}

export default class ExchangeClientFactory implements ExchangeClientFactoryInterface {
  public getByType(type: Exchange) : ExchangeClientInterface {
    let key = process.argv[2]
    let secret = process.argv[3]
    return new BTCMarketsClient(key, secret)
  }
}
