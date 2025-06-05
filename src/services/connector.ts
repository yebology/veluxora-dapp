import { JsonRpcProvider } from "ethers";
import { Contract } from "ethers";
import { BrowserProvider } from "ethers";
import abi from '../abi/abi.json'

const CONTRACT_ADDRESS = "0xC112905923Be73F18512502174A06ABB72c16c9E";
const NETWORK_RPC = "https://ethereum-holesky-rpc.publicnode.com";

export async function getContractWithSigner(walletProvider: any) {
    const provider = new BrowserProvider((walletProvider) as any)
    const signer = await provider.getSigner()
    const contract = new Contract(CONTRACT_ADDRESS, abi, signer)
    return contract
}

export async function getContractWithoutSigner() {
    const provider = new JsonRpcProvider(NETWORK_RPC)
    const contract = new Contract(CONTRACT_ADDRESS, abi, provider)
    return contract
}