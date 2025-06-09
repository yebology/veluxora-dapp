import { formatEther } from "ethers";
import { getAuctionDetailOnServer } from "../server/handler";
import { getContractWithoutSigner, getContractWithSigner } from "./connector";
import { errorMessage } from "../utils/helper";

// done test
export async function registerUser(walletProvider: any) {
  try {
    // berarti perlu write
    const contract = await getContractWithSigner(walletProvider);
    // nembak nama function di smart contract yang udah di deploy
    const transaction = await contract.registerUser();
    // nunggu transaksi bener" masuk dan diconfirmed ke jaringan blockchain
    const receipt = await transaction.wait();
    // kalo transaksi udah masuk ke jaringan blockchain, nanti kita dapet log transaksi
    // disini kita select nama event aja
    const newUserRegisteredEvent = receipt.logs
      .map((log: any) => {
        try {
          return contract.interface.parseLog(log);
        } catch (error) {
          return null;
        }
      })
      .find((parsedLog: any) => parsedLog.name === "NewUserRegistered");

    console.log(newUserRegisteredEvent);

    // lalu direturn
    return {
      status: "success",
      data: {
        hash: transaction.hash, // anggepane kek invoice id
        event: {
          user: newUserRegisteredEvent?.args?.user ?? "",
          message: newUserRegisteredEvent?.args?.message ?? "",
        },
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: errorMessage(error), // return error sesuai dengan smart contract
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
    // cuma perlu read
    const contract = await getContractWithoutSigner();
    // nembak function di smart contract
    const auction = await contract.getAuctionDetail(auctionId);
    // buat parsing sesuaikan tipe data di javascript dengan solidity
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
