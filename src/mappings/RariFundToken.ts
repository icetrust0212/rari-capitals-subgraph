import { BigInt } from "@graphprotocol/graph-ts"
import {
  RariFundToken,
  Approval,
  GovernanceTokenDistributorSet,
  MinterAdded,
  MinterRemoved,
  Paused,
  PauserAdded,
  PauserRemoved,
  Transfer,
  Unpaused
} from "../generated/RariFundToken/RariFundToken"
import { Token } from "../generated/schema"

export function handleApproval(event: Approval): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Token.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new Token(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
  }

  // BigInt and BigDecimal math are supported

  // Entity fields can be set based on event parameters

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.allowance(...)
  // - contract.approve(...)
  // - contract.balanceOf(...)
  // - contract.decimals(...)
  // - contract.decreaseAllowance(...)
  // - contract.increaseAllowance(...)
  // - contract.isMinter(...)
  // - contract.isPauser(...)
  // - contract.name(...)
  // - contract.paused(...)
  // - contract.rariGovernanceTokenDistributor(...)
  // - contract.symbol(...)
  // - contract.totalSupply(...)
  // - contract.transfer(...)
  // - contract.transferFrom(...)
  // - contract.mint(...)
}

export function handleGovernanceTokenDistributorSet(
  event: GovernanceTokenDistributorSet
): void {}

export function handleMinterAdded(event: MinterAdded): void {}

export function handleMinterRemoved(event: MinterRemoved): void {}

export function handlePaused(event: Paused): void {}

export function handlePauserAdded(event: PauserAdded): void {}

export function handlePauserRemoved(event: PauserRemoved): void {}

export function handleTransfer(event: Transfer): void {}

export function handleUnpaused(event: Unpaused): void {}
