import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import OrderRouter from './routes/OrderRouter'
import ExchangeClientFactory from './factories/ExchangeClientFactory'

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  // Run configuration methods on the Express instance.
  constructor() {
    this.express = express()
    this.middleware()
    this.routes()
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'))
    this.express.use(bodyParser.json())
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    const router = express.Router()
    const orderRouter = new OrderRouter(new ExchangeClientFactory())
    // placeholder route handler
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello World!'
      });
    });
    this.express.use('/', router);
    this.express.use('/orders', orderRouter.getRouter());
  }

}

export default new App().express;
