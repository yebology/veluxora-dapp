import { useEffect, useState } from "react";
import {
  createAppKit,
  useAppKit,
  useAppKitAccount,
  useAppKitProvider,
} from "@reown/appkit/react";
import { optimismSepolia, type AppKitNetwork } from "@reown/appkit/networks";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { truncate } from "./utils/helper";

const projectId = import.meta.env.PROJECT_ID;

const networks: [AppKitNetwork] = [optimismSepolia];

const metadata = {
  name: "Veluxora",
  description: "",
  url: "",
  icons: [""],
};

createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
});

function App() {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");

  useEffect(() => {
    console.log("Address");
  }, [isConnected]);

  return (
    <>
      <div>
        <button
          className="rounded-xl p-2 shadow-sm font-bold text-white bg-pink-500"
          onClick={() => open()}
        >
          {address ? truncate(address, 4, 4, 11) : "Connect Wallet"}
        </button>
      </div>
    </>
  );
}

export default App;
