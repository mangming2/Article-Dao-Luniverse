import { useConnectWallet } from "@web3-onboard/react";
import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Article_DAO } from "../../../types";
import { Account } from "../../interfaces/account.interface";
import ArticleDaoABI from "../../abi/Article_DAO.json";
import Loading from "../common/Loading";
import backgroundwhite2 from "../../assets/backgroundwhitelist2.jpg";

let provider;
function ProposalRecruit() {
  const param = useParams<{ userId: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [usedToken, setUsedToken] = useState<number>(0);
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

  const voteRecruit = async () => {
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
      BigNumber.from("10")
    );
    await tx.wait();

    const writerRegistertx = await contract?.aVoteParticipate(
      BigNumber.from("0"),
      BigNumber.from("10")
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
        <RecruitWrap>
          <h1>Proposal Recruitpage</h1>
          {/* <UserName>UserName : {param.userId}</UserName> */}

          <UserName>Proposal Title : Glitch NFT </UserName>
          <UserName>
            Proposal Contents : please Write a Research about Glitch NFT
          </UserName>

          <div> Reward Staking</div>
          <input
            type="number"
            value={usedToken}
            onChange={(e) => setUsedToken(Number(e.target.value))}
          />
          <div>Used Token : {usedToken}</div>
          <button onClick={voteRecruit}>Submit</button>
        </RecruitWrap>
      </Wrap>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  width: 100vw;
  height: 100vh;
  background-image: url(${backgroundwhite2});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Wrap = styled.div`
  display: flex;
  width: 600px;
  height: 400px;
  border: 1px solid #ccc;
  background-color: white;
  flex-direction: column;
  align-items: center;
  margin: 50px auto;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 4%), 0 2px 4px rgb(0 0 0 / 4%),
    0 8px 24px rgb(0 0 0 / 8%);
`;

const RecruitWrap = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
`;

const UserName = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
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

export default ProposalRecruit;
