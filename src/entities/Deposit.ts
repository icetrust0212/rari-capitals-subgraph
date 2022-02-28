import { Address } from "@graphprotocol/graph-ts";
import { Deposit } from "../generated/RariFundManager/RariFundManager";
import { Deposit as DepositType } from "../generated/schema";
import { ensureToken } from "./Token";

export function depositId(event: Deposit): string {
    return `${event.transaction.hash}-${event.logIndex}`;
}

export function createDeposit(event:Deposit): DepositType {
    let entity = new DepositType(depositId(event));

    entity.hash = event.transaction.hash.toString();
    entity.logIndex = event.logIndex;
    entity.protocol = event.transaction.from.toString();
    entity.to = event.params.payee.toString();
    entity.from = event.params.sender.toString();
    entity.blockNumber = event.block.number;
    entity.asset = ensureToken(Address.fromString(event.params.currencyCode.toString())).id;
    entity.amount = event.params.amount.toBigDecimal();
    entity.amountUSD = event.params.amountUsd.toBigDecimal();
    
    entity.save()
    return entity
}

export function ensureDeposit( id: string ): DepositType {
    let entity = DepositType.load(id);
    return entity;
}