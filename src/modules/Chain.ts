import { providers } from "ethers";
import { ChainData, CHAINID } from "../interfaces/config-data.interface";
import CHAINS from "./chain.data";

export class Chain implements ChainData {
  id!: CHAINID;
  name!: string;
  symbol!: string;
  rpcUrl!: string;
  imgUrl!: string;
  defuture!: {
    defaultTokens: [string, string];
    router: string;
    dexName: string;
    dexRouter: string;
  };

  constructor(chainData: ChainData) {
    Object.assign(this, chainData);
  }

  getProvider() {
    return new providers.JsonRpcProvider(this.rpcUrl);
  }

  static get(chainName: CHAINID): Chain {
    return new Chain(CHAINS[chainName]);
  }

  static getAll(): Chain[] {
    return Object.values(CHAINS).map((c) => new Chain(c));
  }

  static getById(chainId: number): Chain {
    const found = this.getAll().find((c) => c.id === chainId);

    if (found) return found;
    else throw Error(`Chain ${chainId} not found`);
  }

  // getV2DefutureRouter(): UniswapV2DefutureRouter {
  //   return new Contract(
  //     this.defuture.router,
  //     UniswapV2DefutureRouterABI,
  //     this.getProvider()
  //   ) as UniswapV2DefutureRouter;
  // }
}
