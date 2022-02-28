import { ethereum } from "@graphprotocol/graph-ts";
import { CurrencyTrade } from "../generated/RariFundController/RariFundController";
import { CurrencyTrade as CurrencyTradeType, Token} from "../generated/schema"

export function currencyTradeId(event: ethereum.Event): string {
    return `${event.transaction.hash}-${event.logIndex}`;
}

export function ensureCurrencyTrade(event: CurrencyTrade): CurrencyTradeType {
    let entity: CurrencyTradeType;

    // Entities only exist after they have been saved to the store;
    // `null` checks allow to create entities on demand
    entity = new CurrencyTradeType(currencyTradeId(event))
  
    // Entity fields can be set based on event parameters
    entity.inputCurrencyCode = event.params.inputCurrencyCode.toString()
    entity.outputCurrencyCode = event.params.outputCurrencyCode.toString();
    entity.inputAmount = event.params.inputAmount;
    entity.inputAmountUsd = event.params.inputAmountUsd.toBigDecimal();
    entity.outputAmount = event.params.outputAmount;
    entity.outputAmountUsd = event.params.outputAmountUsd.toBigDecimal();
    entity.exchange = event.params.exchange.toString();
  
    // Entities can be written to the store with `.save()`
    entity.save();
    return entity;
}