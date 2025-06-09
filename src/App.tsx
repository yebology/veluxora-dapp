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
import {
  cancelAuction,
  claimETHForAuctionCreator,
  createAuction,
  updateAuction,
} from "./services/creator";
import {
  getAuctionDetail,
  getBidHistory,
  registerUser,
  tokenURI,
} from "./services/public";
import { bid, claimNFTForAuctionWinner } from "./services/bidder";

const projectId = import.meta.env.VITE_PROJECT_ID;

const networks: [AppKitNetwork] = [optimismSepolia];

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
  const orderId = "order_1749454183";
  const orderId2 = "order_1749106636";

  useEffect(() => {}, [isConnected, address]);

  const handleCreateAuction = async () => {
    const tokenId = 10;
    const startTime = Math.floor(Date.now() / 1000) + (15 * 60);
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
    const tokenId = 9;
    const startTime = Math.floor(Date.now() / 1000) + 10 * 60;
    const endTime = startTime + 30 * 60;
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

  const handleClaimNFT = async () => {
    console.log(await claimNFTForAuctionWinner(walletProvider, orderId));
  };

  const handleClaimETH = async () => {
    console.log(await claimETHForAuctionCreator(walletProvider, orderId));
  };

  const handleRegisterUser = async () => {
    console.log(await registerUser(walletProvider));
  };

  const handleCancelAuction = async () => {
    console.log(await cancelAuction(walletProvider, orderId));
  };

  const getTokenURI = async () => {
    console.log(await tokenURI(6));
  };

  const bidHistory = async () => {
    console.log(await getBidHistory(orderId));
    console.log(await getBidHistory(orderId2));
  };

  const auctionDetail = async () => {
    console.log(await getAuctionDetail(orderId));
    // console.log(await getAuctionDetail(orderId2));
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
        <button
          className="rounded-xl p-2 shadow-sm font-bold text-white bg-pink-500"
          onClick={() => handleClaimNFT()}
        >
          Claim NFT
        </button>
        <button
          className="rounded-xl p-2 shadow-sm font-bold text-white bg-pink-500"
          onClick={() => handleClaimETH()}
        >
          Claim ETH
        </button>
        <button
          className="rounded-xl p-2 shadow-sm font-bold text-white bg-pink-500"
          onClick={() => handleCancelAuction()}
        >
          Cancel Auction
        </button>
        <button
          className="rounded-xl p-2 shadow-sm font-bold text-white bg-blue-500"
          onClick={() => getTokenURI()}
        >
          Token URI
        </button>
        <button
          className="rounded-xl p-2 shadow-sm font-bold text-white bg-blue-500"
          onClick={() => bidHistory()}
        >
          Bid History
        </button>
        <button
          className="rounded-xl p-2 shadow-sm font-bold text-white bg-blue-500"
          onClick={() => auctionDetail()}
        >
          Auction Detail
        </button>
      </div>
    </>
  );
}

export default App;
