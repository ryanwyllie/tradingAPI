"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BTCMarketsClient_1 = require("../entities/BTCMarketsClient");
class ExchangeClientFactory {
    getByType(type) {
        let key = process.argv[2];
        let secret = process.argv[3];
        return new BTCMarketsClient_1.default(key, secret);
    }
}
exports.default = ExchangeClientFactory;
