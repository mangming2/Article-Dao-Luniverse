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
function Recruitpage() {
  const param = useParams<{ userId: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [usedToken, setUsedToken] = useState<string>("0");
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

  const recruitWhiteList = async () => {
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
        BigNumber.from(usedToken)
      );
      await tx.wait();
    } catch (e) {
      alert("error");
      setLoading(false);
      return;
    }
    try {
      const writerRegistertx = await contract?.wVoteParticipate(
        BigNumber.from(usedToken),
        BigNumber.from(param.userId)
      );
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
        <RecruitWrap>
          <h1>WhiteList Recruitpage</h1>
          <UserName>UserName : {param.userId}</UserName>

          <Description>
            Check Fees: When submitting tokens, you should check the fees
            applicable to that transaction. Some blockchains charge a fee for
            transaction processing, and tokens may not be transferred if you do
            not pay enough fees. Make sure you have enough funds for network
            fees.
          </Description>
          <input
            type="number"
            value={usedToken}
            onChange={(e) => setUsedToken(e.target.value)}
          />
          <div>Used Token : {usedToken}</div>
          <button onClick={recruitWhiteList}>Submit</button>
        </RecruitWrap>
      </Wrap>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  background-image: url(${backgroundwhite2});
  width: 100vw;
  height: 100vh;
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

const RecruitWrap = styled.div`
  display: flex;
  background-color: white;
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
  height: 200px;
  margin-bottom: 20px;
  background-color: #eee;
`;

export default Recruitpage;
