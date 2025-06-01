import axios from "axios";

export async function registerIdentity() {}

export async function createAuctionOnServer(
  name: string,
  image: string,
  description: string
) {
  try {
    const res = await axios.post("<URL>", {
      name: name,
      image: image,
      description: description,
    });
    return res;
  } catch (error) {
    console.log(error);
    return "";
  }
}

export async function getAuctionDetailOnServer(id: string) {
  try {
    const res = await axios.get(`<URL>/${id}`);
    return structuredServerAuction(res.data);
  } catch (error) {
    console.log(error);
    return "";
  }
}

function structuredServerAuction(auction: any) {
  return {
    id: auction.id,
    name: auction.name,
    image: auction.image,
    description: auction.description,
  };
}
