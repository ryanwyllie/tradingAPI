"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Order_1 = require("../entities/Order");
class OrderRouter {
    /**
     * Initialize the OrderRouter
     */
    constructor(exchangeClientFactory) {
        this.exchangeClientFactory = exchangeClientFactory;
        this.router = express_1.Router();
        this.init();
    }
    getRouter() {
        return this.router;
    }
    initialiseExchangeClient(req, res, next) {
        const clientType = req.query.exchange;
        res.locals.exchangeClient = this.exchangeClientFactory.getByType(clientType);
        next();
    }
    /**
     * GET all orders.
     */
    query(req, res, next) {
        res.locals.exchangeClient.getOrders(req.query.fromCurrency, req.query.toCurrency, req.query.status)
            .then((response) => {
            //console.log(response)
            res.send(response.data);
        })
            .catch((error) => {
            console.log(error);
        });
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
        let order = this.getOrderFromRequest(req);
        res.locals.exchangeClient.createOrder(order);
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
        // Make sure we've got an exchange client for the request handling.
        this.router.use(this.initialiseExchangeClient.bind(this));
        this.router.get('/', this.query);
        this.router.post('/', this.create);
        this.router.get('/:id', this.get);
        this.router.delete('/:id', this.delete);
    }
    getOrderFromRequest(req) {
        return new Order_1.Order(null, req.params.exchange, req.params.fromCurrency, req.params.toCurrency, req.params.fromAmount, req.params.toAmount, req.params.clientRequestId ? req.params.clientRequestId : null);
    }
}
exports.default = OrderRouter;
