"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class OrderRouter {
    /**
     * Initialize the OrderRouter
     */
    constructor(exchangeClientFactory) {
        this.exchangeClientFactory = exchangeClientFactory;
        this.router = express_1.Router();
        this.init();
    }
    initialiseClient(req, res, next) {
        let clientType = req.params.exchange;
        res.locals.exchangeClient = this.exchangeClientFactory.getByType(clientType);
        next();
    }
    /**
     * GET all orders.
     */
    query(req, res, next) {
        res.send(res.locals.exchangeClient.createOrder());
    }
    /**
     * GET a single order.
     */
    get(req, res, next) {
        res.send(['test1', 'test2']);
    }
    /**
     * POST create an order.
     */
    create(req, res, next) {
        res.send(['test1', 'test2']);
    }
    /**
     * DELETE all orders.
     */
    delete(req, res, next) {
        res.send(['test1', 'test2']);
    }
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.use(this.initialiseClient.bind(this));
        this.router.get('/', this.query);
        this.router.post('/', this.create);
        this.router.get('/:id', this.get);
        this.router.delete('/:id', this.delete);
    }
}
exports.default = OrderRouter;
