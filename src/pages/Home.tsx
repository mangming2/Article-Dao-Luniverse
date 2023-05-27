import { useConnectWallet as useWeb3onboardWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

import styled from "styled-components";

import character1 from "../assets/character1.jpeg";
import character2 from "../assets/character2.jpeg";

import ArticleDaoABI from "../abi/Article_DAO.json";
import { Article_DAO } from "../../types";

import backgroundwhite2 from "../assets/backgroundwhitelist2.jpg";
import type { TokenSymbol } from "@web3-onboard/common";

let provider;

interface Account {
  address: string;
  balance: Record<TokenSymbol, string> | null;
  ens: { name: string | undefined; avatar: string | undefined };
}

function Home() {
  const [{ wallet }] = useWeb3onboardWallet();
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
      import.meta.env.VITE_APP_ADDRESS,
      ArticleDaoABI,
      signer
    ) as Article_DAO;

    const tx = await contract.mint(account?.address, 10000);

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
    <>
      <Wrap>
        <Container>
          <Content>
            <TextWrap>
              <Title>Welcome to Article DAO</Title>
              <Description>
                Article DAO is method of curating promotion articles with
                decentralized reward system, providing opportunities to anyone
                that desires to participate, and creating a fair, transparent
                environment. Applies custom arithmetic equation to weigh voting
                power, and Markov Chain to constantly adjust the standards for
                vote passing.
              </Description>
            </TextWrap>
            <ButtonWrapper>
              <div className="rounded-md shadow">
                <Button onClick={minting}>Mint</Button>
              </div>
              {/* <button onClick={getbalance}></button> */}
            </ButtonWrapper>
          </Content>
          <Image src={character1} />
        </Container>

        <Container2>
          <Image src={character2} />
          <Content>
            <TextWrap>
              <Title> Problems we have faced:</Title>
              <Description>
                1. What if a user mints large quantity of tokens and use it to
                manipulate any vote results?
                <br /> 2. What if all the recent vote polls have passed, and
                users render the vote results useless?
              </Description>
            </TextWrap>
          </Content>
        </Container2>

        <ProblemContainer>
          <Title> Our DAO Main Functions</Title>
          <ProblemWrap>
            <Problem>
              <ProblemTitle>Custom Arithmetic Equation</ProblemTitle>
              <ProblemDescription>
                Our solution is to create two new variables associated to the
                voter – the number of votes the voter has won, and the number of
                challenges the voter had passed. Then these variables would be
                calculated arithmetically on-chain, creating a new trust-factor
                variable. The new variable would be used to vote, and the
                pending result will be based on the comparison of it.
              </ProblemDescription>
            </Problem>

            <Problem>
              <ProblemTitle>Markov Chain Implementation</ProblemTitle>
              <ProblemDescription>
                Markov values are able to be used to be the standards because we
                perceive it as means to measure voting tendencies. When writer
                registrations consecutively passes, we can assume that the
                standard for the registry is too low, hence we need to raise the
                standards (requirements for poll passing are harder).
              </ProblemDescription>
            </Problem>
          </ProblemWrap>
        </ProblemContainer>

        <FAQContainer>
          <Title>FAQ</Title>
          <FAQWrap>
            <FAQ>
              <FAQTitle>
                What is the purpose of CAE? (Custom Arithmetic Equation)
              </FAQTitle>
              <FAQDescription>
                Ans: DAO’s nature is to reflect as many opinions possible to
                reach a certain value. CAE is used to prevent cases where minor,
                often times a single person, having too much vote power to a
                point where the person could manipulate the voting result. CAE
                allows the balance of weighing vote power using token-only, and
                weighing power of 1 vote per address.
              </FAQDescription>
            </FAQ>
            <FAQ>
              <FAQTitle>
                What are the detailed explanation of Markov Chain
                Implementation?
              </FAQTitle>
              <FAQDescription>
                Markov Chain, which is a model that deduces a probability of
                each event using data of previous state events. For instance, in
                a situation where 5 writer registries were accepted in a row,
                using the Markov transition matrix calculation, we could deduce
                the fact that the next Boolean value will result to True in a
                probability of 3/4. This value, will then be used to be a
                standard for the next vote to pass, meaning 75% of the votes
                should turn to be true for the poll to be accepted.
              </FAQDescription>
            </FAQ>
          </FAQWrap>
        </FAQContainer>

        <TeamContainer>
          <Title>Team</Title>
          <TeamWrap>
            <Team>
              <TeamTitle>JIHO</TeamTitle>
              <TeamDescription>frontend developer</TeamDescription>
            </Team>
            <Team>
              <TeamTitle>JiHwan</TeamTitle>
              <TeamDescription>Contract developer</TeamDescription>
            </Team>
            <Team>
              <TeamTitle>Minsu</TeamTitle>
              <TeamDescription>Contract developer</TeamDescription>
            </Team>
          </TeamWrap>
        </TeamContainer>
      </Wrap>
    </>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  padding: 20px;
  background-image: url(${backgroundwhite2});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
const Container2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 100vw;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;

const Content = styled.div`
  display: flex;
  max-width: 600px;
  flex-direction: column;
`;

const Title = styled.h1`
  color: #1f2937;
  text-shadow: 1px 1px 2px #e5e7eb;
  font-size: 3xl;

  font-weight: 800;
  margin-top: 0;
  margin-bottom: 0.75rem;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Description = styled.p`
  color: #6b7280;
  font-size: 1.125rem;
  margin-top: 0.75rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  background-color: #3b82f6;
  color: #fff;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2563eb;
  }
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  margin: 20px;
  border-radius: 40px;
  /* animation: pulse 3s infinite;

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  } */
`;

const ProblemWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const ProblemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  padding: 20px;
  background-image: url(${backgroundwhite2});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Problem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 0.375rem;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 4%), 0 2px 4px rgb(0 0 0 / 4%),
    0 8px 24px rgb(0 0 0 / 8%);
  width: 600px;
  height: 600px;
`;
const ProblemTitle = styled.h1`
  color: #1f2937;
  text-shadow: 1px 1px 2px #e5e7eb;
  font-size: 2xl;
  text-align: center;

  font-weight: 800;
  margin-top: 0;
  margin-bottom: 0.75rem;
`;
const ProblemDescription = styled.p`
  color: #6b7280;
  text-align: center;
  font-size: 1.125rem;
  margin-top: 0.75rem;
`;

const SolutionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 100vw;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;
const SolutionWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Solution = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 0.375rem;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 4%), 0 2px 4px rgb(0 0 0 / 4%),
    0 8px 24px rgb(0 0 0 / 8%);
`;
const SolutionTitle = styled.h1`
  color: #1f2937;
  text-shadow: 1px 1px 2px #e5e7eb;
  font-size: 2xl;

  font-weight: 800;
  margin-top: 0;
  margin-bottom: 0.75rem;
`;
const SolutionDescription = styled.p`
  color: #6b7280;
  font-size: 1.125rem;
  margin-top: 0.75rem;
`;

const FAQContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  width: 100vw;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  padding: 20px;
  background-image: url(${backgroundwhite2});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
const FAQWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const FAQ = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 0.375rem;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 4%), 0 2px 4px rgb(0 0 0 / 4%),
    0 8px 24px rgb(0 0 0 / 8%);
`;
const FAQTitle = styled.h1`
  color: #1f2937;
  text-shadow: 1px 1px 2px #e5e7eb;
  font-size: 2xl;

  font-weight: 800;
  margin-top: 0;
  margin-bottom: 0.75rem;
`;
const FAQDescription = styled.p`
  color: #6b7280;
  font-size: 1.125rem;
  margin-top: 0.75rem;
`;

const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 100vw;
  height: 600px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;
const TeamWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Team = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 0.375rem;
  padding: 20px;
  margin: 40px;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 4%), 0 2px 4px rgb(0 0 0 / 4%),
    0 8px 24px rgb(0 0 0 / 8%);
`;
const TeamTitle = styled.h1`
  color: #1f2937;
  text-shadow: 1px 1px 2px #e5e7eb;
  font-size: 2xl;

  font-weight: 800;
  margin-top: 0;
  margin-bottom: 0.75rem;
`;
const TeamDescription = styled.p`
  color: #6b7280;
  font-size: 1.125rem;
  margin-top: 0.75rem;
`;

export default Home;
