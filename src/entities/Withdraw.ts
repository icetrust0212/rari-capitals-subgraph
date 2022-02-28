import { Withdrawal } from "../generated/RariFundManager/RariFundManager";
import { Withdraw } from "../generated/schema";
import { ensureToken } from "./Token";

export function withdrawId(event: Withdrawal): string {
    return `${event.transaction.hash}-${event.logIndex}`;
}

export function createWithdraw(event: Withdrawal): Withdraw {
    let entity = new Withdraw(withdrawId(event));

    entity.hash = event.transaction.hash.toString();
    entity.logIndex = event.logIndex;
    entity.protocol = event.transaction.from.toString();
    entity.to = event.params.payee.toString();
    entity.from = event.params.sender.toString();
    entity.blockNumber = event.block.number;
    entity.asset = ensureToken(event.params.currencyCode).id;
    entity.amount = event.params.amount.toBigDecimal();
    entity.amountUSD = event.params.amountUsd.toBigDecimal();
    
    entity.save();
    return entity;
}

export function ensureWithdraw( id: string ) {
    let entity = Withdraw.load(id);
    return entity;
}