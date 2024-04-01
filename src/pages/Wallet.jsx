import { useState } from "react";
import { ethers } from "ethers";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Wallet = () => {
  const [error, setError] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);

  const connectWallet = () => {
    if (window.ethereum) {
      setError("");
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChanged([result[0]]);
        });
    } else {
      toast.error("Please install metamask!");
    }
  };

  const accountChanged = (accountName) => {
    setDefaultAccount(accountName);
    getUserBalance(accountName);
  };

  const getUserBalance = (accountAddress) => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [String(accountAddress), "latest"],
      })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      });
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center lg:w-[calc(100vw-240px)] w-screen h-screen">
      <Button
        className="h-12 px-8 py-4 text-3xl font-semibold"
        onClick={connectWallet}
      >
        {defaultAccount ? "Connected" : "Connect"}
      </Button>
      <h1 className="text-2xl font-bold">
        Account:{" "}
        <span className="font-semibold text-muted-foreground">
          {defaultAccount}
        </span>
      </h1>
    </div>
  );
};

export default Wallet;
