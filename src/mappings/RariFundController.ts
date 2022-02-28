import { BigInt } from "@graphprotocol/graph-ts"
import { ensureCurrencyTrade } from "../entities/CurrencyTrade"
import { ensurePoolAllocation } from "../entities/PoolAllocation";
import {
  RariFundController,
  CurrencyTrade,
  FundDisabled,
  FundEnabled,
  FundManagerSet,
  FundRebalancerSet,
  OwnershipTransferred,
  PoolAllocation
} from "../generated/RariFundController/RariFundController"

export function handleCurrencyTrade(event: CurrencyTrade): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  ensureCurrencyTrade(event);

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.IS_RARI_FUND_CONTROLLER(...)
  // - contract.fundDisabled(...)
  // - contract.isOwner(...)
  // - contract.owner(...)
  // - contract.rariFundManager(...)
  // - contract.upgradeFundController(...)
  // - contract.checkPoolForFunds(...)
  // - contract.getPoolsByCurrency(...)
  // - contract.getDydxBalances(...)
  // - contract._getPoolBalance(...)
  // - contract.getPoolBalance(...)
  // - contract.hasCurrencyInPool(...)
}

export function handleFundDisabled(event: FundDisabled): void {}

export function handleFundEnabled(event: FundEnabled): void {}

export function handleFundManagerSet(event: FundManagerSet): void {}

export function handleFundRebalancerSet(event: FundRebalancerSet): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlePoolAllocation(event: PoolAllocation): void {
  ensurePoolAllocation(event);
}
