import { Address } from '@graphprotocol/graph-ts';
import { ERC20Contract } from '../generated/RariFundToken/ERC20Contract';
import { Token } from '../generated/schema';
import { getERC20Name } from '../utils/getERC20Name';
import { getERC20Symbol } from '../utils/getERC20Symbol';

export function ensureToken(address: Address): Token {
    let token = Token.load(address.toHex()) as Token;
    if (token) {
      return token;
    }
  
    let name = getERC20Name(address);
    let symbol = getERC20Symbol(address);
  
    let contract = ERC20Contract.bind(address);
    let decimalsCall = contract.try_decimals();
    if (decimalsCall.reverted) {
        console.log('decimals() call reverted for {}');
    }
  
    token = new Token(address.toHex());
    token.name = name;
    token.symbol = symbol;
    token.decimals = decimalsCall.value;
    token.save();
  
    return token;
  }
  
  export function ensureTokens(addresses: Address[]): Token[] {
    let tokens: Token[] = new Array<Token>();
    for (let i: number = 0; i < addresses.length; i++) {
      tokens = tokens.concat([ensureToken(addresses[i])]);
    }
  
    return tokens;
  }
  
  export function extractAssets(ids: string[]): Token[] {
    let tokens: Token[] = new Array<Token>();
    for (let i = 0; i < ids.length; i++) {
      let token = Token.load(ids[i]) as Token;
      if (token) {
        tokens = tokens.concat([token]);
      }
    }
  
    return tokens;
  }