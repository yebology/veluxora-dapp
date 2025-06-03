import { formatEther } from "ethers";
import { getAuctionDetailOnServer } from "../server/handler";
import { getContractWithoutSigner } from "./connector";

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

function structuredBidHistory(bidHistory: any) {
  return bidHistory.map((history: any) => ({
    bidder: history.bidder.toString(),
    amount: formatEther(parseInt(history.amount)),
  }));
}

async function structuredAuction(auction: any) {
  const serverAuction = await getAuctionDetailOnServer(auction.id);

  if (serverAuction) {
    return {
      id: auction.id,
      name: serverAuction.name,
      image: serverAuction.image,
      description: serverAuction.description,
      creator: auction.creator.toString(),
      bpkbId: parseInt(auction.bpkbId),
      stnkId: parseInt(auction.stnkId),
      minBid: parseInt(auction.minBid),
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
