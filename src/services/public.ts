import { formatEther } from "ethers";
import { getAuctionDetailOnServer } from "../server/handler";
import { getContractWithoutSigner, getContractWithSigner } from "./connector";
import { errorMessage } from "../utils/helper";

// done test
export async function registerUser(walletProvider: any) {
  try {
    const contract = await getContractWithSigner(walletProvider);
    const transaction = await contract.registerUser();
    return {
      status: "pending",
      data: transaction.hash,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: errorMessage(error),
    };
  }
}

// done test
export async function tokenURI(tokenId: number) {
  try {
    const contract = await getContractWithoutSigner();
    const tokenURI = await contract.tokenURI(tokenId);
    return tokenURI;
  } catch (error) {
    console.log(error);
    return;
  }
}

// done test
export async function getBidHistory(auctionId: string) {
  try {
    const contract = await getContractWithoutSigner();
    const bidHistory = await contract.getBidHistory(auctionId);
    return structuredBidHistory(bidHistory);
  } catch (error) {
    console.log(error);
    return;
  }
}

// done test
export async function getAuctionDetail(auctionId: string) {
  try {
    const contract = await getContractWithoutSigner();
    const auction = await contract.getAuctionDetail(auctionId);
    return structuredAuction(auction);
  } catch (error) {
    console.log(error);
    return;
  }
}

// done test
function structuredBidHistory(bidHistory: any) {
  return bidHistory.map((history: any) => ({
    bidder: history.bidder.toString(),
    amount: formatEther(parseInt(history.amount)),
  }));
}

// done test
async function structuredAuction(auction: any) {
  const serverAuction = await getAuctionDetailOnServer(auction.id);

  if (serverAuction) {
    return {
      id: serverAuction.id,
      name: serverAuction.name,
      image: serverAuction.image,
      description: serverAuction.description,
      creator: auction.creator.toString(),
      tokenId: parseInt(auction.tokenId),
      minBid: formatEther(auction.minBid),
      highestBid: formatEther(parseInt(auction.highestBid)),
      highestBidder: auction.highestBidder.toString(),
      startTime: parseInt(auction.startTime),
      endTime: parseInt(auction.endTime),
      claimed: auction.claimed,
      canceled: auction.canceled,
    };
  } else {
    return;
  }
}
