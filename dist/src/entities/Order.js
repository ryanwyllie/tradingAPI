"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("../Exceptions");
class Order {
    constructor(id, exchange, fromCurrency, toCurrency, fromAmount, toAmount, clientRequestId) {
        this.id = id;
        this.exchange = exchange;
        this.fromCurrency = fromCurrency;
        this.toCurrency = toCurrency;
        this.fromAmount = fromAmount;
        this.toAmount = toAmount;
        this.clientRequestId = clientRequestId;
        if (fromCurrency == toCurrency) {
            throw new Exceptions_1.ClientException("from currency must not match to currency");
        }
    }
}
exports.Order = Order;
