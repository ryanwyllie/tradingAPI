"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class OrderRouter {
    /**
     * Initialize the HeroRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET all Heroes.
     */
    getAll(req, res, next) {
        res.send(['test1', 'test2']);
    }
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/', this.getAll);
    }
}
exports.default = new OrderRouter().router;
