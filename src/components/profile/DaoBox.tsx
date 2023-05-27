import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface DaoComponentProps {
  name: string;
  votes: number;
  quorum: number;
  delegatedVotes: string;
}

interface DaoBoxProps {
  dao: DaoComponentProps;
}

const DaoBox: React.FC<DaoBoxProps> = ({ dao }) => {
  return (
    <Link
      style={{
        textDecoration: "none",
        color: "black",
      }}
      to={`/proposals/${dao.name}`}
    >
      <Wrap>
        <div>{dao.name}</div>

        <div>{dao.votes}</div>

        <div>{dao.quorum}</div>

        <div>{dao.delegatedVotes}</div>
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
export default DaoBox;
