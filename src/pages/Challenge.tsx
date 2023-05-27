import React, { useState } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #2ff215;
  color: #fff;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #148604;
  }
`;
const StyledButton2 = styled.button`
  background-color: #ea0707;
  color: #fff;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #ab0909;
  }
`;

const ChallengeBoxContainer = styled.div`
  padding: 50px;
  padding-top: 8px;
  padding-bottom: 16px;
  display: flex;

  & > div:first-child {
    padding: 10px;
    padding-bottom: 6px;
    flex: 2;
    border-right: 1px solid var(--border-r-neutral-200);
  }
`;

const DescriptionBox = styled.div`
  background-color: var(--bg-primary-50);
  padding: 5px;
  border-radius: 8px;
  margin-bottom: 6px;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 20px;
  margin-top: 6px;
`;

const ChallengeSelectorWrapper = styled.div`
  display: flex;
  margin-top: 4px;
`;
const ChallengeTypeSelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4px;
`;

const RightSideContainer = styled.div`
  border-left: 1px solid grey;
  padding: 30px;
  padding-top: 4px;
  display: flex;
  justify-content: center;
  flex: 3;
`;

const InvestmentFundsBox = styled.div`
  background-color: var(--bg-primary-50);
  padding: 4px;
  border-radius: 8px;
  margin-top: 3px;
`;

const MarginRatioBox = styled.div<{ isWarning: boolean }>`
  display: flex;
  gap: 4px;
  color: ${(props) => (props.isWarning ? "red" : "inherit")};
`;

const MinimumMarginRatioBox = styled.div`
  display: flex;
  gap: 4px;
`;

const ToleranceBox = styled.div`
  display: flex;
  gap: 4px;
`;

const WarningBox = styled.div`
  background-color: var(--bg-yellow-50);
  padding: 4px;
  border-radius: 8px;
  margin-top: 4px;
`;

const ButtonWrap = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
`;

const Challenge = () => {
  const [challengeType, setChallengeType] = useState<string>("new Agenda");

  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleChallengeTypeSelect = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setChallengeType(e.target.value);
  };
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <ChallengeBoxContainer>
      <div>
        <DescriptionBox>
          <p>
            To Challenge in <b>Service name</b>, you should ~~~~~~~&nbsp;
            <b>Minimum Margin Ratio</b>. If long positions fall and short
            positions rise beyond the&nbsp;
            <b>Tolerance</b>, your position may be subject to liquidation.
          </p>
        </DescriptionBox>

        <Title>Choose your challenge type</Title>
        <hr className="mt-2" />
        <ChallengeTypeSelectorWrapper>
          <select onChange={handleChallengeTypeSelect}>
            <option value="New Agenda">New Agenda</option>
            <option value="Exist Agenda">Exist Agenda</option>
            <option value="Whitelist Participation">
              Whitelist Participation
            </option>
          </select>
          <p>Selected Challenge Type: {challengeType}</p>
        </ChallengeTypeSelectorWrapper>
        {challengeType !== "Whitelist Participation" ? (
          <>
            <Title>Choose between pros and cons</Title>
            <hr className="mt-2" />
            <ChallengeSelectorWrapper>
              <div>
                <ButtonWrap>
                  <StyledButton onClick={() => handleOptionSelect("O")}>
                    O
                  </StyledButton>
                  <StyledButton2 onClick={() => handleOptionSelect("X")}>
                    X
                  </StyledButton2>
                </ButtonWrap>
                <p>Selected Option: {selectedOption}</p>
              </div>
              {/* <TokenSelector
            tokenList={tokenList}
            selected={farmToken}
            onSelect={setFarmSymbol}
          /> */}
            </ChallengeSelectorWrapper>
          </>
        ) : (
          <></>
        )}

        <Title>Enter the amount of BASE Token you'd like to invest.</Title>
        <hr className="mt-2" />

        <p className="text-right mt-2 pr-1 text-neutral-600">
          {/* Your balance: {baseTokenBalance || "0.0"} */}
        </p>
      </div>

      <RightSideContainer>
        <div>
          <hr className="my-4" />

          <label
            htmlFor="spot-range"
            className="block mb-2 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Spot - Hedge Ratio
          </label>
          <div className="flex justify-between mb-3">
            {/* <div className="chip-sm chip-purple">Min {MIN_SPOT_PERCENT}%</div> */}
            <div className="chip-sm chip-primary">
              {/* Current: {spotPercent}% */}
            </div>
            <div className="chip-sm chip-purple">Max 100%</div>
          </div>
          <input
            id="spot-range"
            className="rounded-lg overflow-hidden appearance-none bg-primary-100 h-3 w-128"
            type="range"
            step={0.1}
          />

          <InvestmentFundsBox></InvestmentFundsBox>

          <hr className="my-3" />
          <div className="flex flex-col gap-y-1.5">
            <MarginRatioBox isWarning={false}>
              <div className="flex flex-1 justify-between">
                <p className="font-semibold">Current Margin Ratio</p>
                {/* <p> {marginRatio}%</p> */}
              </div>
              <p>:</p>
              <p className="flex-1 text-neutral-500">
                {/* Your {farmToken.symbol} equity compared to strike amount */}
              </p>
            </MarginRatioBox>

            <MinimumMarginRatioBox>
              <div className="flex flex-1 justify-between">
                <p className="font-semibold">Minimum Margin Ratio</p>
                {/* <p> {minMarginBps / 100}%</p> */}
              </div>
              <p>:</p>
              <p className="flex-1 text-neutral-500">
                Min margin ratio required to maintain position.
              </p>
            </MinimumMarginRatioBox>

            <ToleranceBox>
              <div className="flex flex-1 justify-between">
                <p className="font-semibold">Tolerance</p>
                {/* <p> {tolerance >= 100 || tolerance < 0 ? "-" : tolerance}%</p> */}
              </div>
              <p>:</p>
              <p className="flex-1 text-neutral-500">
                The volatility of price fluctuations between paired tokens that
                can be tolerated.
              </p>
            </ToleranceBox>
          </div>

          <WarningBox>
            <p>
              Investing a small percentage of funds in position hedging{" "}
              <b className="text-yellow-800">
                may expose the position to liquidation risk
              </b>{" "}
              even with minor price fluctuations, while{" "}
              <b className="text-yellow-800">
                overinvesting in hedging may limit potential returns.
              </b>
            </p>
          </WarningBox>

          <div className="flex-1 mt-2 flex-center"></div>
        </div>
      </RightSideContainer>
    </ChallengeBoxContainer>
  );
};

export default Challenge;
