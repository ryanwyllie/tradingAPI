import ExchangeClientInterface from './ExchangeClientInterface'
import {OrderInterface}from './Order'
import {Currency} from '../Types'
import axios from 'axios'
import {createHmac} from 'crypto';

enum HTTPMethod {
  GET = "get",
  POST = "post"
}

export default class BTCMarketsClient implements ExchangeClientInterface {
  static server = "https://api.btcmarkets.net"

  constructor(public key: string,
              public secret: string,
              public timeout: number = 2000) {}

  public getOrders(fromCurrency: Currency = null,
                   toCurrency: Currency = null,
                   status: string = null,
                   limit: number | void = 10,
                   since: number | void = 0) {

    const data = {
      currency: fromCurrency,
      instrument: toCurrency,
      limit: limit,
      since: since
    }

    if (status == "open") {
      return this.sendRequest('/order/open', HTTPMethod.POST, data)
    } else {
      return this.sendRequest('/order/history', HTTPMethod.POST, data)
    }
  }

  public getOrder(id: number) {

  }

  public createOrder(order: OrderInterface) {
    return 'it worked'
  }

  private sendRequest(uri: string, method: HTTPMethod, data: object) {
    const jsonData = JSON.stringify(data)
    const timestamp = (new Date()).getTime();

    let message = uri + "\n" + timestamp + "\n"
    if (method == HTTPMethod.POST) {
      message += jsonData;
    }

    const hmac = createHmac('sha512', Buffer.from(this.secret, 'base64'));
    const signature = hmac.update(message).digest('base64');

    const headers = {
      "Accept": "application/json",
      "Accept-Charset": "UTF-8",
      "Content-Type": "application/json",
      "User-Agent": "BTC Markets Client",
      "apikey": this.key,
      "timestamp": timestamp,
      "signature": signature
    };

    const request = {
        headers: headers,
        timeout: this.timeout,
        url: BTCMarketsClient.server + uri,
        method: method,
        data: jsonData
    };

    console.log(request)

    return axios(request)
  }
}
