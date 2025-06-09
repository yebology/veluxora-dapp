import { JsonRpcProvider } from "ethers";
import { Contract } from "ethers";
import { BrowserProvider } from "ethers";
import abi from '../abi/abi.json'

export const CONTRACT_ADDRESS = "0x83C6e4EDbC1B6F8Ac44b9e656eC9cb9b9c03A6DF";
export const NETWORK_RPC = "https://sepolia.optimism.io";

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