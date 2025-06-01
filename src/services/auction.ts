import { formatEther, parseEther } from "ethers";
import {
  createAuctionOnServer,
  getAuctionDetailOnServer,
} from "../server/handler";
import { getContractWithoutSigner, getContractWithSigner } from "./connector";

export async function createAuction(
  walletProvider: any,
  name: string,
  image: string,
  description: string,
  id: string,
  minBid: number,
  startTime: number,
  endTime: number,
  bpkbTokenId: number,
  stnkTokenId: number,
  bpkbUri: string,
  stnkUri: string
) {
  const convertedStartTime = Math.floor(startTime / 1000);
  const convertedEndTime = Math.floor(endTime / 1000);

  const serverRes = await createAuctionOnServer(name, image, description);

  if (serverRes) {
    try {
      const contract = await getContractWithSigner(walletProvider);
      const transaction = await contract.createAuction(
        id,
        minBid,
        convertedStartTime,
        convertedEndTime,
        bpkbTokenId,
        stnkTokenId,
        bpkbUri,
        stnkUri
      );

      return transaction;
    } catch (error) {
      console.log(error);
      return "";
    }
  } else {
    return "";
  }
}

export async function bid(
  walletProvider: any,
  auctionId: string,
  bidAmount: string
) {
  try {
    const contract = await getContractWithSigner(walletProvider);
    const transaction = await contract.bid(auctionId, {
      value: BigInt(parseEther(bidAmount)),
    });
    return transaction;
  } catch (error) {
    console.log(error);
    return "";
  }
}

export async function getBidHistory(auctionId: string) {
  try {
    const contract = await getContractWithoutSigner();
    const bidHistory = await contract.getBidHistory(auctionId);
    return structuredBidHistory(bidHistory);
  } catch (error) {
    console.log(error);
    return "";
  }
}

export async function getAuctionDetail(auctionId: string) {
  try {
    const contract = await getContractWithoutSigner();
    const auction = await contract.getAuctionDetail(auctionId);
    return structuredAuction(auction);
  } catch (error) {
    console.log(error);
    return "";
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
    return "";
  }
}
