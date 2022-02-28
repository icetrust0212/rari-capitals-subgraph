import { Address, log } from '@graphprotocol/graph-ts';
import { ERC20Contract } from '../generated/RariFundToken/ERC20Contract';

export function getERC20Symbol(address: Address): string {
  let contract = ERC20Contract.bind(address);

  let symbolCall = contract.try_symbol();
  let symbol = 'Unknown';

  // standard ERC20 implementation
  if (!symbolCall.reverted) {
    return symbolCall.value;
  }

  return symbol;
}
