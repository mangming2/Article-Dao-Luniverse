import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import backgroundwhite2 from "../../assets/backgroundwhitelist2.jpg";

function WhiteUser() {
  const { userId } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 가정: 아래 정보들은 API나 상태 관리를 통해 가져온다고 가정합니다.
  const user = {
    id: 1,
    name: "사용자 이름",
    postCount: 10,
    contribution: 75,
    tokenCount: 50,
    twitter: "twitter.com/사용자_트위터",
  };

  return (
    <Container>
      <Wrap>
        <WhiteUserWrap>
          <h1>Whitelist User {userId}</h1>
          <p>ID: {user.id}</p>
          <p>이름: {user.name}</p>
          <p>쓴 글의 개수: {user.postCount}</p>
          <p>기여도: {user.contribution}</p>
          <p>가지고 있는 토큰의 개수: {user.tokenCount}</p>
          <p>
            Twitter: <a href={user.twitter}>{user.twitter}</a>
          </p>
          <Link to={`/challenge/${user.id}`}>
            <button>시비걸기</button>
          </Link>
        </WhiteUserWrap>
      </Wrap>
    </Container>
  );
}

export default WhiteUser;

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

const WhiteUserWrap = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
`;
