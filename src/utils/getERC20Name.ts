import { Address, log } from '@graphprotocol/graph-ts';
import { ERC20Contract } from '../generated/RariFundToken/ERC20Contract';

export function getERC20Name(address: Address): string {
  let contract = ERC20Contract.bind(address);

  let nameCall = contract.try_name();
  let name = 'Unknown';

  // standard ERC20 implementation
  if (!nameCall.reverted) {
    return nameCall.value;
  }

  return name;
}
