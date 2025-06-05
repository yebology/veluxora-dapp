import { useEffect } from "react";
import {
  createAppKit,
  useAppKit,
  useAppKitAccount,
  useAppKitProvider,
} from "@reown/appkit/react";
import {
  holesky,
  optimismSepolia,
  type AppKitNetwork,
} from "@reown/appkit/networks";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { truncate } from "./utils/helper";
import { createAuction, updateAuction } from "./services/creator";
import { registerUser } from "./services/public";
import { bid } from "./services/bidder";

const projectId = import.meta.env.VITE_PROJECT_ID;

const networks: [AppKitNetwork] = [holesky];

const metadata = {
  name: "Veluxora",
  description: "",
  url: "",
  icons: [""],
};

createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
});

function App() {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");
  const orderId = "order_1749095802";

  useEffect(() => {}, [isConnected, address]);

  const handleCreateAuction = async () => {
    const tokenId = 5;
    const startTime = Math.floor(Date.now() / 1000) + (5 * 60);
    const endTime = startTime + (15 * 60);
    console.log(
      await createAuction(
        walletProvider,
        "mobile keren",
        "hashd",
        "iadiasd",
        0.0001,
        startTime,
        endTime,
        tokenId,
        "https://gateway.pinata.cloud/ipfs/bafkreih4t76ytkfna7gcn2hgarz6qje4a5hoflpdn7gjy7fzeh3vqjxqzm"
      )
    );
  };

  const handleUpdateAuction = async () => {
    const tokenId = 4;
    const startTime = Math.floor(Date.now() / 1000) + (2 * 60);
    const endTime = startTime + (30 * 60);
    console.log(
      await updateAuction(
        walletProvider,
        "",
        "",
        "",
        orderId,
        0.0002,
        startTime,
        endTime,
        tokenId,
        "https://gateway.pinata.cloud/ipfs/bafkreih4t76ytkfna7gcn2hgarz6qje4a5hoflpdn7gjy7fzeh3vqjxqzm"
      )
    );
  };

  const handleBidUser = async () => {
    console.log(await bid(walletProvider, orderId, 0.0001));
  };

  const handleRegisterUser = async () => {
    console.log(await registerUser(walletProvider));
  };

  return (
    <>
      <div>
        <button
          className="rounded-xl p-2 shadow-sm font-bold text-white bg-pink-500"
          onClick={() => open()}
        >
          {address ? truncate(address, 4, 4, 11) : "Connect Wallet"}
        </button>
        <button
          className="rounded-xl p-2 shadow-sm font-bold text-white bg-pink-500"
          onClick={() => handleRegisterUser()}
        >
          Register
        </button>
        <button
          className="rounded-xl p-2 shadow-sm font-bold text-white bg-pink-500"
          onClick={() => handleCreateAuction()}
        >
          Create Auction
        </button>
        <button
          className="rounded-xl p-2 shadow-sm font-bold text-white bg-pink-500"
          onClick={() => handleUpdateAuction()}
        >
          Update Auction
        </button>
        <button
          className="rounded-xl p-2 shadow-sm font-bold text-white bg-pink-500"
          onClick={() => handleBidUser()}
        >
          Bid Auction
        </button>
      </div>
    </>
  );
}

export default App;
