import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface ProposalComponentProps {
  title: string;
  status: string;
  deadline: string;
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
}
interface ProposalBoxProps {
  proposal: ProposalComponentProps;
}
const VoteChart = ({
  votesFor,
  votesAgainst,
  totalVotes,
}: {
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
}) => {
  // Calculate the percentage of votes
  const percentageFor = (votesFor / totalVotes) * 100;
  const percentageAgainst = (votesAgainst / totalVotes) * 100;

  return (
    <VoteChartContainer>
      <VoteBar width={`${percentageFor}%`} color="green" />
      <VoteBar width={`${percentageAgainst}%`} color="red" />
    </VoteChartContainer>
  );
};

const VoteChartContainer = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
`;

const VoteBar = styled.div<{ width: string; color: string }>`
  height: 10px;
  width: ${(props) => props.width};
  background-color: ${(props) => props.color};
`;

const ProposalBox: React.FC<ProposalBoxProps> = ({ proposal }) => {
  return (
    <Link
      style={{
        textDecoration: "none",
        color: "black",
      }}
      to={`/proposals/${proposal.title}`}
    >
      <Wrap>
        <div>{proposal.title}</div>

        <div>{proposal.status}</div>

        <div>{proposal.deadline}</div>
        <VoteChart
          votesFor={proposal.votesFor}
          votesAgainst={proposal.votesAgainst}
          totalVotes={proposal.totalVotes}
        />
      </Wrap>
    </Link>
  );
};

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr 2fr 5fr;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: ;

  width: 100%;

  align-items: center;
  justify-items: center;

  padding: 10px 0;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 0 2px rgb(0 0 0 / 4%), 0 3px 5px rgb(0 0 0 / 4%),
      0 10px 32px rgb(0 0 0 / 8%);
  }
`;
export default ProposalBox;
