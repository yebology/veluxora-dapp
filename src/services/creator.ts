import { parseEther } from "ethers";
import {
  createAuctionOnServer,
  updateAuctionOnServer,
} from "../server/handler";
import { getContractWithSigner } from "./connector";
import { errorMessage } from "../utils/helper";

// done test
export async function createAuction(
  walletProvider: any,
  name: string,
  image: string,
  description: string,
  minBid: number,
  startTime: number,
  endTime: number,
  tokenId: number,
  tokenUri: string
) {
  const orderId = "order_" + Math.floor(Date.now() / 1000);
  // const serverRes = await createAuctionOnServer(name, image, description);

  // if (serverRes) {
  try {
    const contract = await getContractWithSigner(walletProvider);
    const transaction = await contract.createAuction(
      orderId,
      parseEther(minBid.toString()),
      startTime,
      endTime,
      tokenId,
      tokenUri
    );
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
  // } else {
  //   return;
  // }
}

// done test
export async function updateAuction(
  walletProvider: any,
  name: string,
  image: string,
  description: string,
  id: string,
  minBid: number,
  startTime: number,
  endTime: number,
  tokenId: number,
  tokenUri: string
) {
  const convertedStartTime = Math.floor(startTime / 1000);
  const convertedEndTime = Math.floor(endTime / 1000);

  // const serverRes = await updateAuctionOnServer(id, name, image, description);

  // if (serverRes) {
  try {
    const contract = await getContractWithSigner(walletProvider);
    const transaction = await contract.updateAuction(
      id,
      parseEther(minBid.toString()),
      convertedStartTime,
      convertedEndTime,
      tokenId,
      tokenUri
    );

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
  // } else {
  //   return;
  // }
}

export async function claimETHForAuctionCreator(
  walletProvider: any,
  id: string
) {
  try {
    const contract = await getContractWithSigner(walletProvider);
    const transaction = await contract.claimETHForAuctionCreator(id);
    return transaction;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function cancelAuction(walletProvider: any, id: string) {
  try {
    const contract = await getContractWithSigner(walletProvider);
    const transaction = await contract.cancelAuction(id);
    return transaction;
  } catch (error) {
    console.log(error);
    return;
  }
}
