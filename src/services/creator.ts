import { formatEther, parseEther } from "ethers";
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
    const receipt = await transaction.wait();

    const newAuctionCreatedEvent = receipt.logs
      .map((log: any) => {
        try {
          return contract.interface.parseLog(log);
        } catch (error) {
          return null;
        }
      })
      .find((parsedLog: any) => parsedLog.name === "NewAuctionCreated");

    console.log(newAuctionCreatedEvent);

    return {
      status: "success",
      data: {
        hash: transaction.hash,
        event: {
          creator: newAuctionCreatedEvent?.args?.creator ?? "",
          auctionId: newAuctionCreatedEvent?.args?.auctionId ?? "",
          message: newAuctionCreatedEvent?.args?.message ?? "",
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
    const receipt = await transaction.wait();

    const auctionUpdatedEvent = receipt.logs
      .map((log: any) => {
        try {
          return contract.interface.parseLog(log);
        } catch (error) {
          return null;
        }
      })
      .find((parsedLog: any) => parsedLog.name === "AuctionUpdated");

    console.log(auctionUpdatedEvent);

    return {
      status: "success",
      data: {
        hash: transaction.hash,
        event: {
          auctionId: auctionUpdatedEvent?.args?.auctionId ?? "",
          message: auctionUpdatedEvent?.args?.message ?? "",
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
  // } else {
  //   return;
  // }
}

// done test
export async function claimETHForAuctionCreator(
  walletProvider: any,
  id: string
) {
  try {
    const contract = await getContractWithSigner(walletProvider);
    const transaction = await contract.claimETHForAuctionCreator(id);
    const receipt = await transaction.wait();

    const winningETHTransferredEvent = receipt.logs
      .map((log: any) => {
        try {
          return contract.interface.parseLog(log);
        } catch (error) {
          return null;
        }
      })
      .find((parsedLog: any) => parsedLog.name === "WinningETHTransferred");

    console.log(winningETHTransferredEvent);

    return {
      status: "success",
      data: {
        hash: transaction.hash,
        event: {
          creator: winningETHTransferredEvent?.args?.creator ?? "",
          auctionId: winningETHTransferredEvent?.args?.auctionId ?? "",
          amount:
            String(
              formatEther(winningETHTransferredEvent?.args?.amount) + " ETH"
            ) ?? "0 ETH",
          message: winningETHTransferredEvent?.args?.message ?? "",
        },
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      data: errorMessage(error),
    };
  }
}

// done test
export async function cancelAuction(walletProvider: any, id: string) {
  try {
    const contract = await getContractWithSigner(walletProvider);
    const transaction = await contract.cancelAuction(id);
    const receipt = await transaction.wait();

    const auctionCanceledEvent = receipt.logs
      .map((log: any) => {
        try {
          return contract.interface.parseLog(log);
        } catch (error) {
          return null;
        }
      })
      .find((parsedLog: any) => parsedLog.name === "AuctionCanceled");

    console.log(auctionCanceledEvent);

    return {
      status: "success",
      data: {
        hash: transaction.hash,
        event: {
          auctionId: auctionCanceledEvent?.args?.auctionId ?? "",
          message: auctionCanceledEvent?.args?.message ?? "",
        },
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      data: errorMessage(error),
    };
  }
}
