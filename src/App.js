import "./App.css";
import Header from "./components/header/header.jsx";
import Background from "./components/background/background";
import Info from "./components/info/info.jsx";
import CreatePopUp from "./components/popups/CreatePopUp/createPopUp.jsx";

import Discover from "./components/discover/discover.jsx";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const GRAPH_API_URI =
  "https://api.studio.thegraph.com/query/37184/mr-thegraph/v0.0.2";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: GRAPH_API_URI,
});

const { chains, provider } = configureChains([goerli], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "Market Research",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "",
        element: <Info />,
      },
      {
        path: "discover",
        element: <Discover />,
      },
    ],
  },
]);

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ApolloProvider client={client}>
          <div className="App">
            <Background>
              <CreatePopUp />
              {/* <RouterProvider router={router} /> */}
              {/*     mainscreen={mainscreen} */}
              {/*     setMainScreen={setMainScreen} */}
              {/*     setCreate={setCreate} */}
              {/*     setReview={setReview} */}
              {/*     setQuestionsR={setQuestionsR} */}
              {/*     setAnswersR={setAnswersR} */}
              {/*     setAddressR={setAddressR} */}
              {/*   /> */}
              {/*   {create && <Create onShow={() => setCreate(false)} />} */}
              {/*   {review && ( */}
              {/*     <Review */}
              {/*       onShow={() => setReview(false)} */}
              {/*       questionsR={questionsR} */}
              {/*       answersR={answersR} */}
              {/*       addressR={addressR} */}
              {/*     /> */}
              {/*   )} */}
            </Background>
          </div>
        </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
