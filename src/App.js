import "./App.css";
import Header from "./component/header/header";
import Main from "./component/main/main";
import Create from "./component/create/create";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Review from "./component/review/review";
import { useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.studio.thegraph.com/query/37184/mr-thegraph/v0.0.2",
});

const { chains, provider } = configureChains(
  [goerli],
  [publicProvider()]
  // [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function App() {
  const [create, setCreate] = useState(false);
  const [review, setReview] = useState(false);
  const [mainscreen, setMainScreen] = useState(0);
  const [questionsR, setQuestionsR] = useState([]);
  const [answersR, setAnswersR] = useState([]);
  const [addressR, setAddressR] = useState();

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ApolloProvider client={client}>
          <div className="App">
            <Header setMainScreen={setMainScreen} />
            <Main
              mainscreen={mainscreen}
              setMainScreen={setMainScreen}
              setCreate={setCreate}
              setReview={setReview}
              setQuestionsR={setQuestionsR}
              setAnswersR={setAnswersR}
              setAddressR={setAddressR}
            />
            {create ? <Create onShow={() => setCreate(false)} /> : ""}
            {review ? (
              <Review
                onShow={() => setReview(false)}
                questionsR={questionsR}
                answersR={answersR}
                addressR={addressR}
              />
            ) : (
              ""
            )}
          </div>
        </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
