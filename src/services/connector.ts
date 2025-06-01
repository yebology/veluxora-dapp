import { JsonRpcProvider } from "ethers";
import { Contract } from "ethers";
import { BrowserProvider } from "ethers";

const contractAddress = "";
const networkRPC = "";

export async function getContractWithSigner(walletProvider: any) {
    const provider = new BrowserProvider((walletProvider) as any)
    const signer = await provider.getSigner()
    const contract = new Contract(contractAddress, "", signer)
    return contract
}

export async function getContractWithoutSigner() {
    const provider = new JsonRpcProvider(networkRPC)
    const contract = new Contract(contractAddress, "", provider)
    return contract
}