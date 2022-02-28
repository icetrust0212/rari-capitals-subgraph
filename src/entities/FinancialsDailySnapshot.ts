import { BigDecimal, ethereum } from "@graphprotocol/graph-ts";
import { Deposit, RariFundManager, Withdrawal } from "../generated/RariFundManager/RariFundManager";
import { FinancialsDailySnapshot } from "../generated/schema";

// " ID is # of days since Unix epoch time "
//   id: ID!

//   protocol: Protocol!

//   totalValueLockedUSD: BigDecimal!

//   " Protocol treasury should be composed of non-productive protocol assets. This may be an insurance fund, operational budget, or any other assets not directly generating revenue "
//   protocolTreasuryUSD: BigDecimal

//   " Only relevant for protocols with PCV. "
//   protocolControlledValueUSD: BigDecimal

//   " Total volume in USD "
//   totalVolumeUSD: BigDecimal!

//   " Revenue claimed by suppliers to the protocol. LPs on DEXs (e.g. 2.5% of the swap fee in Sushiswap). Depositors on Lending Protocols. NFT sellers on OpenSea. "
//   supplySideRevenueUSD: BigDecimal!

//   " Gross revenue for the protocol (revenue claimed by protocol). Examples: AMM protocol fee (Sushi’s 0.5%). OpenSea 10% sell fee. "
//   protocolSideRevenueUSD: BigDecimal!

//   " Fees paid by the users. e.g. 3.0% of swap fee in Sushiswap "
//   feesUSD: BigDecimal!
  
//   " Block number of this snapshot "
//   blockNumber: BigInt!

//   " Timestamp of this snapshot "
//   timestamp: BigInt!
export enum FinancialType {
    Deposit,
    Withdraw
}

export function getFinancialDailySnapshotId(event: ethereum.Event) {
    let timestamp = event.block.timestamp;
    return timestamp.toString();
}

export function ensureFinancialDailySnapshot(financialType: FinancialType, event: ethereum.Event) {
    let entity = FinancialsDailySnapshot.load(getFinancialDailySnapshotId(event));
    if (!entity) {
        entity = new FinancialsDailySnapshot(getFinancialDailySnapshotId(event));
    }

    let RariFundManagerContract = RariFundManager.bind(event.address)
    

    let financialEvent: Deposit | Withdrawal;
    if (financialType === FinancialType.Deposit) {
        financialEvent = event as Deposit
        entity.protocolTreasuryUSD = entity.protocolTreasuryUSD.plus(financialEvent.params.amountUsd.toBigDecimal())
        entity.protocolControlledValueUSD = entity.protocolControlledValueUSD.plus(financialEvent.params.amountUsd.toBigDecimal())
    } else {
        financialEvent = event as Withdrawal;
        entity.protocolTreasuryUSD = entity.protocolTreasuryUSD.minus(financialEvent.params.amountUsd.toBigDecimal());
        entity.protocolControlledValueUSD = entity.protocolControlledValueUSD.minus(financialEvent.params.amountUsd.toBigDecimal());
    }
    entity.totalVolumeUSD = RariFundManagerContract.getFundBalance().toBigDecimal();
    entity.totalValueLockedUSD = RariFundManagerContract.getRawFundBalance().toBigDecimal()
    entity.supplySideRevenueUSD = RariFundManagerContract.getInterestAccrued().toBigDecimal();
    entity.protocolSideRevenueUSD = RariFundManagerContract.getInterestFeesGenerated().toBigDecimal();
    entity.feesUSD = RariFundManagerContract.getRawInterestAccrued().toBigDecimal();
    entity.blockNumber = event.block.number;
    entity.timestamp = event.block.timestamp;
    entity.protocol = event.transaction.from.toString();
    entity.save();
}