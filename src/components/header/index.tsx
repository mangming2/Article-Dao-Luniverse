import Navbar from "../Navbar";
import styled from "styled-components";
import bannerImg from "../../assets/banner.jpg";
import logoImg from "../../assets/logo.png";
import { useEffect, useState } from "react";
import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
import type { TokenSymbol } from "@web3-onboard/common";

interface Account {
  address: string;
  balance: Record<TokenSymbol, string> | null;
  ens: { name: string | undefined; avatar: string | undefined };
}

function Header() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [ethersProvider, setProvider] =
    useState<ethers.providers.Web3Provider | null>();
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    if (wallet?.provider) {
      const { name, avatar } = wallet?.accounts[0].ens ?? {};
      setAccount({
        address: wallet.accounts[0].address,
        balance: wallet.accounts[0].balance,
        ens: { name, avatar: avatar?.url },
      });
    }
  }, [wallet]);

  useEffect(() => {
    // If the wallet has a provider than the wallet is connected
    if (wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, "any"));
      // if using ethers v6 this is:
      // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    }
  }, [wallet]);

  return (
    <Wrap>
      <StyledHeaderBox>
        <img src={logoImg} width="100px" height="100px" alt="logo" />
        <h1>Article DAO</h1>
        {/* {account ? (
          <Button className="btn btn-secondary" onClick={onDisconnect}>
            {ellipsisAddress(account)}
          </Button>
        ) : (
          <Button className="btn btn-primary" onClick={connect}>
            Connect
          </Button>
        )} */}
        {wallet?.provider && account ? (
          <div>
            {account.ens?.avatar ? (
              <img src={account.ens?.avatar} alt="ENS Avatar" />
            ) : null}
            {/* <div>{account.ens?.name ? account.ens.name : account.address}</div>
            <div>Connected to {wallet.label}</div> */}
            <Button
              onClick={() => {
                disconnect({ label: wallet.label });
              }}
            >
              Disconnect
            </Button>
          </div>
        ) : (
          <div>
            <Button disabled={connecting} onClick={() => connect()}>
              Connect
            </Button>
          </div>
        )}
      </StyledHeaderBox>
      <Navbar />
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0;
  height: 200px;
  background-image: url(${bannerImg});
  background-size: 100% 300px; /* 가로는 100%, 세로는 자동으로 설정 */
  background-position: top; /* 가운데 정렬하고 위쪽으로 위치 조정 */
  background-repeat: no-repeat;
  overflow: hidden;
`;

const StyledHeaderBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  > img {
    margin: 20px;
  }
`;

const Button = styled.button`
  width: 200px;
  height: 50px;
  margin: 20px;
  border-radius: 16px;
  background-color: #ffffff;
  border: 1px solid #ffffff;
  color: #000000;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  &:hover {
    background-color: #000000;
    color: #ffffff;
  }
`;

export default Header;
