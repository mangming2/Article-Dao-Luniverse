import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

function Navbar() {
  const location = useLocation();
  return (
    <Wrap>
      <StyledLink to="/" state={location.pathname === "/"}>
        Home
      </StyledLink>
      <StyledLink
        to="/whitelist"
        state={
          location.pathname === "/whitelist" ||
          location.pathname.startsWith("/whitelist/")
        }
      >
        Whitelist
      </StyledLink>
      <StyledLink
        to="/proposals"
        state={
          location.pathname === "/proposals" ||
          location.pathname.startsWith("/proposals/")
        }
      >
        Proposals
      </StyledLink>
      {/* <StyledLink to="/challenge" state={location.pathname === "/challenge"}>
        Challenge
      </StyledLink> */}
      {/* <StyledLink to="/profile" state={location.pathname === "/profile"}>
        MyPage
      </StyledLink> */}
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0 20px;
  color: #ffffff;
`;

const StyledLink = styled(Link)(({ state }) => ({
  color: "#000",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "150px",
  height: "50px",
  marginRight: "40px",
  marginLeft: "40px",
  alignItems: "center",
  background: `${
    state
      ? "linear-gradient(101.05deg, #36a9e8 -5.36%, #36dde9 29.46%, #39b6d8 56.03%, #34ceed 81.92%);"
      : "none"
  }`,
  borderRadius: "16px",
  textDecoration: "none",
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "24px",

  "&:hover": {
    color: "blue",
  },

  "@media (max-width: 768px)": {
    marginTop: "10px",
  },
}));

export default Navbar;
