import { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import DaoBox from "../components/profile/DaoBox";

import backgroundwhite2 from "../assets/backgroundwhitelist2.jpg";
import { Account } from "../interfaces/account.interface";
import ArticleDaoABI from "../abi/Article_DAO.json";
import { Article_DAO } from "../../types";
import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
import { ellipsisAddress } from "../utils/ellipsisAddress";

interface DaoComponentProps {
  name: string;
  votes: number;
  quorum: number;
  delegatedVotes: string;
}

const daos: DaoComponentProps[] = [
  {
    name: "dao1",
    votes: 3,
    quorum: 5,
    delegatedVotes: "Votes",
  },
  {
    name: "dao2",
    votes: 5,
    quorum: 8,
    delegatedVotes: "dVotes",
  },
];

let provider;

function Profile() {
  const [{ wallet }] = useConnectWallet();
  const [account, setAccount] = useState<Account | null>(null);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(
    null
  );

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

  const minting = async () => {
    console.log(account);
    if (!wallet?.provider || !account || !signer) {
      alert("Connect Wallet");
      return;
    }
    // // eslint-disable-next-line react-hooks/rules-of-hooks
    // const provider = new ethers.providers.Web3Provider(wallet.provider, "any");
    // const signer = provider.getUncheckedSigner();

    const contract: Article_DAO = new ethers.Contract(
      "0xa334b3B9eBcbdac00bEC120fB17d25367018662e",
      ArticleDaoABI,
      signer
    ) as Article_DAO;

    const tx = await contract.mint(account?.address, 1);

    tx.wait().then((receipt) => {
      alert("Minted");
    });
  };

  const getbalance = async () => {
    if (!wallet?.provider || !account || !signer) {
      alert("Connect Wallet");
      return;
    }
    // const provider = new ethers.providers.Web3Provider(wallet.provider, "any");
    // const signer = provider.getUncheckedSigner();
    const contract: Article_DAO = new ethers.Contract(
      "0xa334b3B9eBcbdac00bEC120fB17d25367018662e",
      ArticleDaoABI,
      signer
    ) as Article_DAO;
    console.log(contract);
    const tx = await contract.totalSupply();
    alert(tx);
  };
  return (
    <Container>
      <Wrap>
        <ProfileWrap>
          <h1>Profile</h1>
          <ProfileImg src={Logo} alt="" />
          <p>name</p>
          <p> {account ? ellipsisAddress(account?.address) : ""}</p>
        </ProfileWrap>

        <RecordWrap>
          <h1>Contribution record</h1>

          <TableWrap>
            <Header>
              <Title>Title</Title>
              <Title>State</Title>
              <Title>Deadline</Title>
              <Title>Votes</Title>
            </Header>
            {daos.map((dao, index) => (
              <DaoBox key={index} dao={dao} />
            ))}
          </TableWrap>
        </RecordWrap>
      </Wrap>
    </Container>
  );
}

export default Profile;
const Container = styled.div`
  padding: 20px;
  background-image: url(${backgroundwhite2});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  width: 800px;
  height: 500px;

  border: 1px solid #ccc;
  background-color: white;
  flex-direction: row;

  margin: 20px auto;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 4%), 0 2px 4px rgb(0 0 0 / 4%),
    0 8px 24px rgb(0 0 0 / 8%);
`;

const ProfileWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const RecordWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TableWrap = styled.div``;

const Header = styled.div`
  background-color: #f0f0f0;
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 4fr 2fr 5fr;
  align-items: center;
  justify-items: center;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  margin-bottom: 5px;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 16px;
`;
