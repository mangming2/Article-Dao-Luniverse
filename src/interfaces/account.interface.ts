import type { TokenSymbol } from "@web3-onboard/common";
export interface Account {
  address: string;
  balance: Record<TokenSymbol, string> | null;
  ens: { name: string | undefined; avatar: string | undefined };
}
