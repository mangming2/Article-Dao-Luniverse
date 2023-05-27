import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./index.css";
import { RecoilRoot } from "recoil";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { Web3OnboardProvider, init } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import infinityWalletModule from "@web3-onboard/infinity-wallet";
import fortmaticModule from "@web3-onboard/fortmatic";
import gnosisModule from "@web3-onboard/gnosis";
import keepkeyModule from "@web3-onboard/keepkey";
import keystoneModule from "@web3-onboard/keystone";
import ledgerModule from "@web3-onboard/ledger";
import portisModule from "@web3-onboard/portis";
import trezorModule from "@web3-onboard/trezor";
import walletConnectModule from "@web3-onboard/walletconnect";
import coinbaseModule from "@web3-onboard/coinbase";
import magicModule from "@web3-onboard/magic";
import dcentModule from "@web3-onboard/dcent";
import sequenceModule from "@web3-onboard/sequence";
import tahoModule from "@web3-onboard/taho";
import trustModule from "@web3-onboard/trust";
import frontierModule from "@web3-onboard/frontier";

const INFURA_KEY = "";

const injected = injectedModule();
const coinbase = coinbaseModule();
const dcent = dcentModule();
const walletConnect = walletConnectModule();

const portis = portisModule({
  apiKey: "apiKey",
});

const fortmatic = fortmaticModule({
  apiKey: "apiKey",
});

const infinityWallet = infinityWalletModule();
const ledger = ledgerModule();
const keystone = keystoneModule();
const keepkey = keepkeyModule();
const gnosis = gnosisModule();
const sequence = sequenceModule();
const taho = tahoModule(); // Previously named Tally Ho wallet
const trust = trustModule();
const frontier = frontierModule();

const trezorOptions = {
  email: "test@test.com",
  appUrl: "https://www.blocknative.com",
};

const trezor = trezorModule(trezorOptions);

const magic = magicModule({
  apiKey: "apiKey",
});

const wallets = [
  infinityWallet,
  keepkey,
  sequence,
  injected,
  trust,
  frontier,
  taho,
  ledger,
  coinbase,
  dcent,
  trezor,
  walletConnect,
  gnosis,
  magic,
  fortmatic,
  keystone,
  portis,
];

const chains = [
  {
    id: "0x1",
    token: "ETH",
    label: "Ethereum Mainnet",
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  },
  {
    id: "0x5",
    token: "ETH",
    label: "Goerli",
    rpcUrl: `https://goerli.infura.io/v3/${INFURA_KEY}`,
  },

  {
    id: "0xA4B1",
    token: "ARB-ETH",
    label: "Arbitrum",
    rpcUrl: "https://rpc.ankr.com/arbitrum",
  },
  {
    id: "0x8294",
    token: "ARB-ETH",
    label: "Arbitrum Fuji",
    rpcUrl: "https://rpc.testnet.arbitrum.one",
  },
  {
    id: "0x1A29B",
    token: "AVAX",
    label: "Avalanche (C-Chain)",
    rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
  },
  {
    id: "0x13881",
    token: "MATIC",
    label: "Matic Mumbai",
    rpcUrl: "https://rpc-mumbai.maticvigil.com",
  },
];

const appMetadata = {
  name: "Connect Wallet Example",
  icon: "<svg>My App Icon</svg>",
  description: "Example showcasing how to connect a wallet.",
  recommendedInjectedWallets: [
    { name: "MetaMask", url: "https://metamask.io" },
    { name: "Coinbase", url: "https://wallet.coinbase.com/" },
  ],
};

const web3Onboard = init({
  wallets,
  chains,
  appMetadata,
});
declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Web3OnboardProvider web3Onboard={web3Onboard}>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </Web3OnboardProvider>
);
