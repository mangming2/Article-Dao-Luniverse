import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

import backgroundwhite2 from "../assets/backgroundwhitelist2.jpg";

import Logo from "../assets/articlebox.jpeg";

import ArticleDaoABI from "../abi/Article_DAO.json";
import { Article_DAO } from "../../types";
import { ethers } from "ethers";
import { useConnectWallet } from "@web3-onboard/react";
import type { TokenSymbol } from "@web3-onboard/common";
import Loading from "../components/common/Loading";

// Define the interface for the customer data

interface RecruitBoxProps {
  recruit: member;
}
interface member {
  id: number;
  handle: string;
}
const Descript = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #236480;

  margin-bottom: 20px;
`;

const ContentWrapBox = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;

  width: 250px;
  height: 60px;
  border-radius: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  background-image: url(${Logo});
  background-size: 80px; /* 이미지 크기 조정 */
  background-repeat: no-repeat;
  background-position: right center; /* 오른쪽 가운데에 위치 */
  margin-bottom: 10px;
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 4%), 0 2px 4px rgb(0 0 0 / 4%),
      0 8px 24px rgb(0 0 0 / 8%);
  }
  background-color: white;
`;
const ContentTextBox = styled.div`
  display: flex;
  margin-left: 20px;
  p {
    font-family: "Noto Sans KR", sans-serif;
    font-size: 16px;
    font-weight: 700;
    margin: 0;
    color: #077fb3;
  }
`;

const RecruitBox: React.FC<RecruitBoxProps> = ({ recruit }) => {
  return (
    <ContentWrapBox>
      <ContentTextBox>
        <p>User ID: {recruit.id}</p>
      </ContentTextBox>
    </ContentWrapBox>
  );
};

const recruits: member[] = [
  {
    id: 0,
    handle: "@John Doe",
  },
  {
    id: 1,
    handle: "@Jane Doe",
  },
];

interface PendingBoxProps {
  pending: member;
}

const PendingBox: React.FC<PendingBoxProps> = ({ pending }) => {
  return (
    <ContentWrapBox>
      <ContentTextBox>
        <p>UserID: {pending.id}</p>
      </ContentTextBox>
    </ContentWrapBox>
  );
};

const pendings: member[] = [
  {
    id: 0,
    handle: "@John Doe",
  },
  {
    id: 1,
    handle: "@Jane Doe",
  },
  {
    id: 2,
    handle: "@John Smith",
  },
  {
    id: 3,
    handle: "@Jane Smith",
  },
];

interface Account {
  address: string;
  balance: Record<TokenSymbol, string> | null;
  ens: { name: string | undefined; avatar: string | undefined };
}
let provider;

const Proposal = () => {
  const [{ wallet }] = useConnectWallet();
  const [maxIndex, setMaxIndex] = useState<number>(0);

  const [account, setAccount] = useState<Account | null>(null);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(
    null
  );
  const [recruitList, setRecruitList] = useState<any[] | null | undefined>([]);
  const [pendingList, setPendingList] = useState<any[] | null | undefined>([]);
  const [whiteUserList, setWhiteUserList] = useState<any[] | null | undefined>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

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

      const contract: Article_DAO = new ethers.Contract(
        import.meta.env.VITE_APP_ADDRESS,
        ArticleDaoABI,
        provider.getUncheckedSigner()
      ) as Article_DAO;

      const getUsersList = async () => {
        const max = await contract?.getproposalnum();
        const maxNum = max.toNumber();
        setMaxIndex(maxNum);
        console.log(maxNum);
        for (let i = 0; i < maxNum; i++) {
          const state = await contract?.getProposal(i);

          if (state.toNumber() === 0) {
            setRecruitList((prev) => [{ ...recruitList, id: i }]);
          } else if (state.toNumber() === 1) {
            setPendingList((prev) => [{ ...pendingList, id: i }]);
          } else if (state.toNumber() === 3) {
            setWhiteUserList((prev) => [{ ...whiteUserList, id: i }]);
          }
        }
      };
      getUsersList();

      // const getReqruitlist = async () => {
      //   const balance = await contract.balanceOf(wallet.accounts[0].address);
      //   setMyToken(balance.toString());
      // };
    }
  }, [wallet?.provider]);

  const refreshLists = async () => {
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

    setLoading(true);
    const getUsersList = async () => {
      await contract.refreshA();
      alert("Success");
      setLoading(false);
    };
    getUsersList();
  };

  const whitelists: member[] = [
    {
      id: 0,
      handle: "@John Doe",
    },
    {
      id: 1,
      handle: "@Jane Doe",
    },
    {
      id: 2,
      handle: "@John Smith",
    },
  ];

  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  return (
    <Container>
      {loading && <Loading />}
      <TitleWrap>
        <Title>Proposals</Title>
        <Link to={`/register`}>
          <StyledButton>Register</StyledButton>
        </Link>
        <StyledButton onClick={refreshLists}> Refresh</StyledButton>
      </TitleWrap>
      <ListWrap>
        <RecruitWrap>
          <h2>Recruit</h2>
          <Descript>
            This is a list of items that currently wish to be registered.
          </Descript>
          <CustomerList>
            {/* 더미데이터 */}
            {recruits.map((recruit) => (
              <>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  to={`recruit/${recruit.id}`}
                >
                  <RecruitBox key={recruit.id} recruit={recruit} />
                </Link>
              </>
            ))}
            {recruitList &&
              recruitList.map((recruit) => (
                <>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                    to={`recruit/${recruit.id}`}
                  >
                    <RecruitBox key={recruit.id} recruit={recruit} />
                  </Link>
                </>
              ))}
          </CustomerList>
        </RecruitWrap>
        <PendingWrap>
          <h2>Pending</h2>
          <Descript>
            This is a list of items that are currently being voted on.
          </Descript>
          <CustomerList>
            {/* 더미데이터 */}
            {pendings.map((pending) => (
              <>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  to={`pending/${pending.id}`}
                >
                  <PendingBox key={pending.id} pending={pending} />
                </Link>
              </>
            ))}
            {pendingList &&
              pendingList.map((pending) => (
                <>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                    to={`pending/${pending.id}`}
                  >
                    <PendingBox key={pending.id} pending={pending} />
                  </Link>
                </>
              ))}
          </CustomerList>
        </PendingWrap>
        <WhitelistWrap>
          <h2>Whitelist</h2>
          <Descript>
            This is a list of items that have currently been voted on.
          </Descript>
          <CustomerList>
            {/* 더미데이터 */}
            {whitelists.map((customer) => (
              <>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                  to={`https://twitter.com/${customer.handle}}`}
                >
                  <ContentWrapBox>
                    <ContentTextBox>
                      <p>Tweet: {customer.handle}</p>
                    </ContentTextBox>
                  </ContentWrapBox>
                </Link>
              </>
            ))}
            {whiteUserList &&
              whiteUserList.map((whiteUser) => (
                <>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                    to={`https://twitter.com/${whiteUser.handle}}`}
                  >
                    <ContentWrapBox>
                      <ContentTextBox>
                        <p>UserID: {whiteUser.id}</p>
                      </ContentTextBox>
                    </ContentWrapBox>
                  </Link>
                </>
              ))}
          </CustomerList>
        </WhitelistWrap>
      </ListWrap>
    </Container>
  );
};

export default Proposal;

const Container = styled.div`
  padding: 20px;
  background-image: url(${backgroundwhite2});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;
const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  width: 100px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;

const ListWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
`;
const RecruitWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PendingWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WhitelistWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CustomerList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const TitleWrap = styled.div`
  display: flex;

  align-items: center;
`;
