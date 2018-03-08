import ExchangeClientInterface from './ExchangeClientInterface'

export default class BTCMarketsClient implements ExchangeClientInterface {
  public createOrder() {
    return 'it worked'
  }
}
