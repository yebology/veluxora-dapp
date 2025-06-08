export interface Auction {
    id: string,
    name: string, // db
    image: string, // db
    description: string, // db
    creator: string, // smart contract
    tokenId: number, // smart contract
    minBid: number, // smart contract
    highestBid: number, // smart contract
    highestBidder: string, // smart contract
    startTime: number, // smart contract
    endTime: number, // smart contract
    claimed: boolean, // smart contract
    canceled: boolean, // smart contract
    // kalo mau nambah atribut tambahan apapun simpen di db
}