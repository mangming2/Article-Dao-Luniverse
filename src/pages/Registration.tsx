import { useEffect, useState } from "react";
import styled from "styled-components";
import type { TokenSymbol } from "@web3-onboard/common";
import ArticleDaoABI from "../abi/Article_DAO.json";
import { Article_DAO } from "../../types";

import { BigNumber, ethers } from "ethers";
import { useConnectWallet } from "@web3-onboard/react";
import Loading from "../components/common/Loading";
import backgroundwhite2 from "../assets/backgroundwhitelist2.jpg";

interface Proposal {
  id: number;
  title: string;
  description: string;
  reward: string;
}
let provider;

interface Account {
  address: string;
  balance: Record<TokenSymbol, string> | null;
  ens: { name: string | undefined; avatar: string | undefined };
}

function Registration() {
  const [loading, setLoading] = useState<boolean>(false);
  const [proposals, setProposals] = useState<Proposal>({
    id: 0,
    title: "",
    description: "",
    reward: "0",
  });

  const [{ wallet }] = useConnectWallet();

  const [account, setAccount] = useState<Account | null>(null);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(
    null
  );

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
      provider = new ethers.providers.Web3Provider(wallet.provider, "any");
      setSigner(provider.getUncheckedSigner());
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
    const tx = await contract?.approve(
      import.meta.env.VITE_APP_ADDRESS,
      BigNumber.from(proposals.reward)
    );
    await tx.wait();

    const writerRegistertx = await contract?.propose(
      BigNumber.from(proposals.reward)
    );
    await writerRegistertx.wait();

    // const tx = await contract?.writerRegister(BigNumber.from("1"));
    setLoading(false);
    alert("Success");
  };

  return (
    <Container>
      {loading && <Loading />}
      <Wrap>
        <h1>Proposal registration</h1>
        <Description>
          {" "}
          Check Fees: When submitting tokens, you should check the fees
          applicable to that transaction. Some blockchains charge a fee for
          transaction processing, and tokens may not be transferred if you do
          not pay enough fees. Make sure you have enough funds for network fees.
        </Description>

        <InputWrap>
          <div>Proposal Title:</div>
          <input
            type="text"
            value={proposals?.title}
            onChange={(e) =>
              setProposals({ ...proposals, title: e.target.value })
            }
          />
        </InputWrap>
        <InputWrap>
          <div>Proposal Description: </div>
          <input
            type="text"
            value={proposals?.description}
            onChange={(e) =>
              setProposals({ ...proposals, description: e.target.value })
            }
          />
        </InputWrap>

        <InputWrap>
          <div>Reward Staking </div>
          <input
            type="string"
            value={proposals?.reward}
            onChange={(e) =>
              setProposals({ ...proposals, reward: e.target.value })
            }
          />
        </InputWrap>
        <div>Used Token : {proposals.reward}</div>
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
  height: 550px;
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
  width: 500px;
  height: 100px;
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

export default Registration;
