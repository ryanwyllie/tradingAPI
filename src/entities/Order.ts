import {Currency, Exchange} from '../Types'
import {ClientException} from '../Exceptions'

export interface OrderInterface {
  id: string | null
  exchange: Exchange
  fromCurrency: Currency
  toCurrency: Currency
  fromAmount: number
  toAmount: number
  clientRequestId: string | null
}

export class Order implements OrderInterface {
  constructor(public id: string,
              public exchange: Exchange,
              public fromCurrency: Currency,
              public toCurrency: Currency,
              public fromAmount: number,
              public toAmount: number,
              public clientRequestId: string)
  {
    if (fromCurrency == toCurrency) {
      throw new ClientException("from currency must not match to currency")
    }
  }
}
