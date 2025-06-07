import { formatEther, parseEther } from "ethers";
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
    const receipt = await transaction.wait();

    const newBidAddedEvent = receipt.logs
      .map((log: any) => {
        try {
          return contract.interface.parseLog(log);
        } catch (error) {
          return null;
        }
      })
      .find((parsedLog: any) => parsedLog.name === "NewBidAdded");

    console.log(newBidAddedEvent);

    return {
      status: "success",
      data: {
        hash: transaction.hash,
        event: {
          bidder: newBidAddedEvent?.args?.bidder ?? "",
          auctionId: newBidAddedEvent?.args?.auctionId ?? "",
          amount:
            String(formatEther(newBidAddedEvent?.args?.amount) + " ETH") ??
            "0 ETH",
          message: newBidAddedEvent?.args?.message ?? "",
        },
      },
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
export async function claimNFTForAuctionWinner(
  walletProvider: any,
  id: string
) {
  try {
    const contract = await getContractWithSigner(walletProvider);
    const transaction = await contract.claimNFTForAuctionWinner(id);
    const receipt = await transaction.wait();

    const nftClaimedByWinnerEvent = receipt.logs
      .map((log: any) => {
        try {
          return contract.interface.parseLog(log);
        } catch (error) {
          return null;
        }
      })
      .find((parsedLog: any) => parsedLog.name === "NFTClaimedByWinner");

    console.log(nftClaimedByWinnerEvent);

    return {
      status: "success",
      data: {
        hash: transaction.hash,
        event: {
          winner: nftClaimedByWinnerEvent?.args?.winner ?? "",
          auctionId: nftClaimedByWinnerEvent?.args?.auctionId ?? "",
          tokenId: parseInt(nftClaimedByWinnerEvent?.args?.tokenId) ?? 0,
          message: nftClaimedByWinnerEvent?.args?.message ?? "",
        },
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: errorMessage(error),
    };
  }
}
