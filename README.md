Crypto Exchange Javascript API Client
===============

# API docs

## Place order
Path: `/orders`
HTTP POST

Takes a list of orders.

Request params:
**exchange** Which exchange to place the order on. Allowed values: "BTCMARKETS", "POLONIEX"
**fromCurrency** The currency being sold. Allowed values: "AUD", "BTC", "ETH"
**toCurrency** The currency being bought. Allowed values: "AUD", "BTC", "ETH"
**fromAmount** The amount currency wishing to be sold
**toAmount** The amount of currency to be bought with the fromAmount
**clientRequestId (optional)** An id provided by the client to track the request


## Cancel order
## Get balances
## Get order book for given market
## Get (our) outstanding order
