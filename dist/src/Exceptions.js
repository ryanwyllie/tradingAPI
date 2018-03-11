"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClientException {
    constructor(message) {
        this.message = message;
    }
}
exports.ClientException = ClientException;
class ServerException {
    constructor(message) {
        this.message = message;
    }
}
exports.ServerException = ServerException;
