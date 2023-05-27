import { Outlet } from "react-router-dom";
import Header from "./components/header";
import { styled } from "styled-components";

import backgroundImage2 from "./assets/background2.jpg";

function App() {
  return (
    <Wrap>
      <Header />
      <StyledBackground>
        <Outlet />
      </StyledBackground>
      {/* <div>footer</div> */}
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  min-width: 100vw;
  min-height: 100vh;
`;

const StyledBackground = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;

  min-width: 100vw;
  min-height: 100vh;
  background-image: url(${backgroundImage2});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export default App;
