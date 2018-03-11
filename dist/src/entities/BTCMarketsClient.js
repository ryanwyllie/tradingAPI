"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const crypto_1 = require("crypto");
var HTTPMethod;
(function (HTTPMethod) {
    HTTPMethod["GET"] = "get";
    HTTPMethod["POST"] = "post";
})(HTTPMethod || (HTTPMethod = {}));
class BTCMarketsClient {
    constructor(key, secret, timeout = 2000) {
        this.key = key;
        this.secret = secret;
        this.timeout = timeout;
    }
    getOrders(fromCurrency = null, toCurrency = null, status = null, limit = 10, since = 0) {
        const data = {
            currency: fromCurrency,
            instrument: toCurrency,
            limit: limit,
            since: since
        };
        if (status == "open") {
            return this.sendRequest('/order/open', HTTPMethod.POST, data);
        }
        else {
            return this.sendRequest('/order/history', HTTPMethod.POST, data);
        }
    }
    getOrder(id) {
    }
    createOrder(order) {
        return 'it worked';
    }
    sendRequest(uri, method, data) {
        const jsonData = JSON.stringify(data);
        const timestamp = (new Date()).getTime();
        let message = uri + "\n" + timestamp + "\n";
        if (method == HTTPMethod.POST) {
            message += jsonData;
        }
        const hmac = crypto_1.createHmac('sha512', Buffer.from(this.secret, 'base64'));
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
        console.log(request);
        return axios_1.default(request);
    }
}
BTCMarketsClient.server = "https://api.btcmarkets.net";
exports.default = BTCMarketsClient;
