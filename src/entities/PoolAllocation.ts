import { PoolAllocation } from "../generated/RariFundController/RariFundController";
import { PoolAllocation as PoolAllocationType} from "../generated/schema"

export function poolAllocationId(event: PoolAllocation): string {
    return `${event.transaction.hash}-${event.logIndex}`;
}

export function ensurePoolAllocation(event: PoolAllocation): PoolAllocationType {
    let entity: PoolAllocationType;

    // Entities only exist after they have been saved to the store;
    // `null` checks allow to create entities on demand
    entity = new PoolAllocationType(poolAllocationId(event))
  
    // Entity fields can be set based on event parameters
    entity.action = event.params.action.toString();
    entity.pool = event.params.pool.toString();
    entity.currencyCode = event.params.currencyCode.toString();
    entity.amount = event.params.amount
    // Entities can be written to the store with `.save()`
    entity.save();
    return entity;
}