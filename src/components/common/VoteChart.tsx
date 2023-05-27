import styled from "styled-components";

const VoteChartContainer = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  margin-top: 10px;
`;

const VoteBar = styled.div<{ width: string; color: string }>`
  height: 10px;
  width: ${(props) => props.width};
  background-color: ${(props) => props.color};
`;

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

export default VoteChart;
