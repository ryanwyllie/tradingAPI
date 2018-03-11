import {Router, Request, Response, NextFunction} from 'express';
import {ExchangeClientFactoryInterface} from '../factories/ExchangeClientFactory'
import {Exchange} from '../Types'
import {Order, OrderInterface} from '../entities/Order'

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
    const clientType: Exchange = req.query.exchange
    res.locals.exchangeClient = this.exchangeClientFactory.getByType(clientType)
    next()
  }

  /**
   * GET all orders.
   */
  public query(req: Request, res: Response, next: NextFunction) {
    res.locals.exchangeClient.getOrders(
        req.query.fromCurrency,
        req.query.toCurrency,
        req.query.status
      )
      .then((response: any) => {
        //console.log(response)
        res.send(response.data)
      })
      .catch((error: any) => {
        console.log(error);
      })
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
    let order = this.getOrderFromRequest(req)
    res.locals.exchangeClient.createOrder(order)
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
  private init() {
    // Make sure we've got an exchange client for the request handling.
    this.router.use(this.initialiseExchangeClient.bind(this))
    this.router.get('/', this.query)
    this.router.post('/', this.create)
    this.router.get('/:id', this.get)
    this.router.delete('/:id', this.delete)
  }

  private getOrderFromRequest(req: Request) : OrderInterface {
    return new Order(
      null,
      req.params.exchange,
      req.params.fromCurrency,
      req.params.toCurrency,
      req.params.fromAmount,
      req.params.toAmount,
      req.params.clientRequestId ? req.params.clientRequestId : null
    )
  }
}

export default OrderRouter
