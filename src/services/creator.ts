import {
  createAuctionOnServer,
} from "../server/handler";
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