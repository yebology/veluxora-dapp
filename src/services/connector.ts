import { JsonRpcProvider } from "ethers";
import { Contract } from "ethers";
import { BrowserProvider } from "ethers";
import abi from '../abi/abi.json'

export const CONTRACT_ADDRESS = "0x83C6e4EDbC1B6F8Ac44b9e656eC9cb9b9c03A6DF";
export const NETWORK_RPC = "https://sepolia.optimism.io";

// write
export async function getContractWithSigner(walletProvider: any) {
    // dapetin wallet yang ada di browser
    const provider = new BrowserProvider((walletProvider) as any)
    // dapetin signer dari wallet yang ada (sign bertujuan untuk buktiin kalo km bner" ngelakuin sebuah transaksi)
    const signer = await provider.getSigner()
    // supaya transaksimu bisa diarahkan ke contract yang sesuai
    const contract = new Contract(CONTRACT_ADDRESS, abi, signer)
    return contract
}

// read
export async function getContractWithoutSigner() {
    // supaya bisa baca data dari jaringan terkait (optimism) --> gada hubungannya sama wallet
    const provider = new JsonRpcProvider(NETWORK_RPC)
    // supaya tau detail contract yang mau dibaca
    const contract = new Contract(CONTRACT_ADDRESS, abi, provider)
    return contract
}