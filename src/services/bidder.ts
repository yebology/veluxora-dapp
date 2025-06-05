import { parseEther } from "ethers";
import { getContractWithSigner } from "./connector";
import { errorMessage } from "../utils/helper";

// done test
export async function bid(
  walletProvider: any,
  auctionId: string,
  bidAmount: number
) {
  try {
    const contract = await getContractWithSigner(walletProvider);
    const transaction = await contract.bid(auctionId, {
      value: BigInt(parseEther(bidAmount.toString())),
    });
    return {
      status: "pending",
      data: transaction.hash
    }
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: errorMessage(error)
    };
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
