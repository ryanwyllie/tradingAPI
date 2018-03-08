import {Router, Request, Response, NextFunction} from 'express';
import ExchangeClientFactoryInterface from '../factories/ExchangeClientFactoryInterface'

class OrderRouter {
  private router: Router
  private exchangeClientFactory: ExchangeClientFactoryInterface

  /**
   * Initialize the OrderRouter
   */
  constructor(exchangeClientFactory: ExchangeClientFactoryInterface) {
    this.exchangeClientFactory = exchangeClientFactory
    this.router = Router();
    this.init();
  }

  public getRouter() : Router {
    return this.router
  }

  public initialiseExchangeClient(req: Request, res: Response, next: NextFunction) {
    const clientType: string = req.params.exchange
    res.locals.exchangeClient = this.exchangeClientFactory.getByType(clientType)
    next()
  }

  /**
   * GET all orders.
   */
  public query(req: Request, res: Response, next: NextFunction) {
    res.send(res.locals.exchangeClient.createOrder())
  }

  /**
   * GET a single order.
   */
  public get(req: Request, res: Response, next: NextFunction) {
    res.send(['test1', 'test2'])
  }

  /**
   * POST create an order.
   */
  public create(req: Request, res: Response, next: NextFunction) {
    res.send(['test1', 'test2'])
  }

  /**
   * DELETE all orders.
   */
  public delete(req: Request, res: Response, next: NextFunction) {
    res.send(['test1', 'test2'])
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    // Make sure we've got an exchange client for the request handling.
    this.router.use(this.initialiseExchangeClient.bind(this))
    this.router.get('/', this.query)
    this.router.post('/', this.create)
    this.router.get('/:id', this.get)
    this.router.delete('/:id', this.delete)
  }

}

export default OrderRouter
