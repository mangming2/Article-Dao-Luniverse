import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ProposalDetail from "./components/proposal/ProposalDetail";
import ProposalPending from "./components/proposal/ProposalPending";
import ProposalRecruit from "./components/proposal/ProposalRecruit";
import Pending from "./components/Whitelist/Pending";
import Recruitpage from "./components/Whitelist/Recruitpage";
import WhiteUser from "./components/Whitelist/WhiteUser";
import WhiteUserRegister from "./components/Whitelist/WhiteUserRegister";
import Challenge from "./pages/Challenge";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Proposal from "./pages/Proposal";
import Registration from "./pages/Registration";
import Whitelist from "./pages/Whitelist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },

      {
        path: "proposals",
        element: <Proposal />,
      },
      {
        path: "proposals/recruit/:userId",
        element: <ProposalRecruit />,
      },
      {
        path: "proposals/pending/:userId",
        element: <ProposalPending />,
      },
      {
        path: "proposals/:proposalTitle",
        element: <ProposalDetail />,
      },

      {
        path: "whitelist",
        element: <Whitelist />,
      },
      {
        path: "whitelist/:userId",
        element: <WhiteUser />,
      },
      {
        path: "whitelist/recruit/:userId",
        element: <Recruitpage />,
      },
      {
        path: "whitelist/pending/:userId",
        element: <Pending />,
      },
      {
        path: "whitelist/register",
        element: <WhiteUserRegister />,
      },

      {
        path: "challenge/:challengeId",
        element: <Challenge />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "register",
        element: <Registration />,
      },
    ],
  },
]);

export default router;
