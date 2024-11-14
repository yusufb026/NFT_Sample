import React from "react";

import { WalletModalProps } from "@cosmos-kit/core";
import { ConnectWalletSideCurtainContent } from "./ConnectWalletSideCurtainContent";

declare global {
  interface Window {
    leap: any;
    keplr: any;
    cosmostation: any;
  }
}

// Define Modal Component
export default function ConnectWalletSideCurtain({
  isOpen,
  setOpen,
  walletRepo,
}: WalletModalProps) {
  return (
    <>
      <div className="relative z-[100]">
        {isOpen && (
          <div
            className={
              "fixed left-0 top-0 z-[2] flex h-screen w-screen items-center justify-center bg-[#000000B2] p-2 backdrop-blur-[2.5px] dark:bg-[#000000B2]"
            }
            onClick={() => {
              setOpen(false);
            }}
          >
            <div
              className={
                "z-[3] flex max-w-full flex-col items-center justify-center"
              }
              onClick={(event) => event.stopPropagation()}
            >
              <ConnectWalletSideCurtainContent
                isOpen
                walletRepo={walletRepo}
                setOpen={setOpen}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
