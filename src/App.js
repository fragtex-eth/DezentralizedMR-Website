import "./App.css";
import Header from "./components/header/header.js";
import Info from "./components/info/info";
import Background from "./components/common/background/background";
// import Main from "./component/main/main";
// import Create from "./component/create/create";
// import Review from "./component/review/review";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const GRAPH_API_URI =
  "https://api.studio.thegraph.com/query/37184/mr-thegraph/v0.0.2";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: GRAPH_API_URI,
});

const { chains, provider } = configureChains([goerli], [publicProvider()]);

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
            <Background>
              <Header />
              <Info />
              {/*   <Main */}
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
