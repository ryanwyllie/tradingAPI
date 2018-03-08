"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BTCMarketsClient_1 = require("../entities/BTCMarketsClient");
class ExchangeClientFactory {
    getByType(type) {
        return new BTCMarketsClient_1.default();
    }
}
exports.default = ExchangeClientFactory;
