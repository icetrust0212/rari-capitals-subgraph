import { BigInt } from "@graphprotocol/graph-ts"
import { createDeposit } from "../entities/Deposit"
import {
  RariFundManager,
  Deposit,
  FundControllerSet,
  FundDisabled,
  FundEnabled,
  FundManagerUpgraded,
  FundPriceConsumerSet,
  FundProxySet,
  FundRebalancerSet,
  FundTokenSet,
  InterestFeeDeposit,
  OwnershipTransferred,
  Withdrawal
} from "../generated/RariFundManager/RariFundManager"

export function handleDeposit(event: Deposit): void {
  createDeposit(event);
}

export function handleFundControllerSet(event: FundControllerSet): void {}

export function handleFundDisabled(event: FundDisabled): void {}

export function handleFundEnabled(event: FundEnabled): void {}

export function handleFundManagerUpgraded(event: FundManagerUpgraded): void {}

export function handleFundPriceConsumerSet(event: FundPriceConsumerSet): void {}

export function handleFundProxySet(event: FundProxySet): void {}

export function handleFundRebalancerSet(event: FundRebalancerSet): void {}

export function handleFundTokenSet(event: FundTokenSet): void {}

export function handleInterestFeeDeposit(event: InterestFeeDeposit): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleWithdrawal(event: Withdrawal): void {}
