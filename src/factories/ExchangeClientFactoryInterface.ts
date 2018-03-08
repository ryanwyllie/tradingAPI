import ExchangeClientInterface from '../entities/ExchangeClientInterface'

export default interface ExchangeClientFactoryInterface {
  getByType(type: string) : ExchangeClientInterface
}
