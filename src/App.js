import "./App.scss";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import Home from "./views/home/home.jsx";
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

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ApolloProvider client={client}>
          <div className="App">
            <Home />
          </div>
        </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
