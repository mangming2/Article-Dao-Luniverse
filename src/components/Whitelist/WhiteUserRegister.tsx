import { useConnectWallet } from "@web3-onboard/react";
import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Article_DAO } from "../../../types";
import ArticleDaoABI from "../../abi/Article_DAO.json";
import type { TokenSymbol } from "@web3-onboard/common";
import Loading from "../common/Loading";
import backgroundwhite2 from "../../assets/backgroundwhitelist2.jpg";

interface Writer {
  account: string;
  handle: string;
}
let provider;

interface Account {
  address: string;
  balance: Record<TokenSymbol, string> | null;
  ens: { name: string | undefined; avatar: string | undefined };
}

function WhiteUserRegister() {
  const [writers, setWriters] = useState<Writer>({
    account: "",
    handle: "",
  });
  const [{ wallet }] = useConnectWallet();

  const [account, setAccount] = useState<Account | null>(null);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const [myToken, setMyToken] = useState<string>("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!wallet?.provider) {
      provider = null;
    } else {
      const { name, avatar } = wallet?.accounts[0].ens ?? {};
      setAccount({
        address: wallet.accounts[0].address,
        balance: wallet.accounts[0].balance,
        ens: { name, avatar: avatar?.url },
      });
      setWriters({ ...writers, account: wallet.accounts[0].address });
      provider = new ethers.providers.Web3Provider(wallet.provider, "any");
      setSigner(provider.getUncheckedSigner());

      const contract: Article_DAO = new ethers.Contract(
        import.meta.env.VITE_APP_ADDRESS,
        ArticleDaoABI,
        provider.getUncheckedSigner()
      ) as Article_DAO;

      const getMyToken = async () => {
        const balance = await contract.balanceOf(wallet.accounts[0].address);
        setMyToken(balance.toString());
      };
      getMyToken();
    }
  }, [wallet?.provider]);

  const registerWhiteList = async () => {
    if (!wallet?.provider || !account || !signer) {
      alert("Connect Wallet");
      return;
    }

    const contract: Article_DAO = new ethers.Contract(
      import.meta.env.VITE_APP_ADDRESS,
      ArticleDaoABI,
      signer
    ) as Article_DAO;
    setLoading(true);

    try {
      const tx = await contract?.approve(
        import.meta.env.VITE_APP_ADDRESS,
        BigNumber.from("110")
      );
      await tx.wait();
    } catch (e) {
      alert("error");
      setLoading(false);
      return;
    }
    try {
      const writerRegistertx = await contract?.writerRegister(writers.handle);
      await writerRegistertx.wait();

      // const tx = await contract?.writerRegister(BigNumber.from("1"));
      setLoading(false);
      alert("Success");
    } catch (e) {
      setLoading(false);
      alert("error");
    }
  };
  return (
    <Container>
      {loading && <Loading />}
      <Wrap>
        <h1>Writer Register</h1>
        <Description>
          Check Fees: When submitting tokens, you should check the fees
          applicable to that transaction. Some blockchains charge a fee for
          transaction processing, and tokens may not be transferred if you do
          not pay enough fees. Make sure you have enough funds for network fees.
        </Description>

        <InputWrap>
          <div>My Account: {writers.account}</div>
        </InputWrap>
        <InputWrap>
          <div>Tweet handle: </div>
          <input
            type="text"
            value={writers?.handle}
            onChange={(e) => setWriters({ ...writers, handle: e.target.value })}
          />
        </InputWrap>
        <div>My Token : {myToken}</div>

        <InputWrap>
          <div>Reward Staking </div>
        </InputWrap>

        <Button onClick={registerWhiteList}>Submit</Button>
      </Wrap>
    </Container>
  );
}
const Container = styled.div`
  padding: 20px;
  background-image: url(${backgroundwhite2});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Wrap = styled.div`
  display: flex;
  width: 600px;
  height: 600px;
  border: 1px solid #ccc;
  background-color: white;
  flex-direction: column;
  align-items: center;
  margin: 50px auto;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 4%), 0 2px 4px rgb(0 0 0 / 4%),
    0 8px 24px rgb(0 0 0 / 8%);
`;
const Description = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;

  font-size: 15px;
  font-weight: bold;
  width: 600px;
  height: 150px;
  margin-bottom: 20px;
  background-color: #eee;
`;
const InputWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 500px;
  height: 50px;
  input {
    width: 300px;
    height: 30px;
    margin-left: 10px;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
  margin-top: 10px;
`;

export default WhiteUserRegister;
