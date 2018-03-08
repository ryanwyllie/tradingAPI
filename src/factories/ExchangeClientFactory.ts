import ExchangeClientInterface from '../entities/ExchangeClientInterface'
import BTCMarketsClient from '../entities/BTCMarketsClient'

export default class ExchangeClientFactory {
  public getByType(type: string) : ExchangeClientInterface {
    return new BTCMarketsClient()
  }
}
