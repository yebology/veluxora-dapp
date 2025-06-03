import { createAuctionOnServer, updateAuctionOnServer } from "../server/handler";
import { getContractWithSigner } from "./connector";

export async function createAuction(
  walletProvider: any,
  name: string,
  image: string,
  description: string,
  id: string,
  minBid: number,
  startTime: number,
  endTime: number,
  tokenId: number,
  tokenUri: number
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
        tokenId,
        tokenUri
      );

      return transaction;
    } catch (error) {
      console.log(error);
      return;
    }
  } else {
    return;
  }
}

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
  tokenUri: number
) {
  const convertedStartTime = Math.floor(startTime / 1000);
  const convertedEndTime = Math.floor(endTime / 1000);

  const serverRes = await updateAuctionOnServer(id, name, image, description);

  if (serverRes) {
    try {
      const contract = await getContractWithSigner(walletProvider);
      const transaction = await contract.updateAuction(
        id,
        minBid,
        convertedStartTime,
        convertedEndTime,
        tokenId,
        tokenUri
      );

      return transaction;
    } catch (error) {
      console.log(error);
      return;
    }
  } else {
    return;
  }
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
