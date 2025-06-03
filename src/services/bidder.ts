import { parseEther } from "ethers";
import { getContractWithSigner } from "./connector";

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

export async function claimNFTForAuctionWinner(
  walletProvider: any,
  id: string
) {
  try {
    const contract = await getContractWithSigner(walletProvider);
    const transaction = await contract.claimNFTForAuctionWinner(id);
    return transaction;
  } catch (error) {
    console.log(error);
    return "";
  }
}
