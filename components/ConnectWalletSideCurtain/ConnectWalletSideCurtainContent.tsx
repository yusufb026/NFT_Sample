import {
  MainWalletBase,
  State,
  WalletModalProps,
  WalletStatus,
} from "@cosmos-kit/core";
import { useManager, useWallet, useWalletClient } from "@cosmos-kit/react";

import { MdOutlineClose } from "react-icons/md";
import HorizontalDivider from "../divider";
import {
  COSMOSTATION_WALLET_EXTENSION_URL,
  COSMOS_KIT_WALLET_NAMES,
  KEPLR_WALLET_EXTENSION_URL,
  LEAP_WALLET_EXTENSION_URL,
  METAMASK_WALLET_EXTENSION_URL,
  SUPPORTED_WALLETS,
} from "../../config/constants";
// import { Images } from "images";
import React, { useEffect, useMemo, useState } from "react";
import { ConnectWalletCard } from "./ConnectWalletCard";
import Text from "../Text";
import { set } from "lodash";

const walletOrder: (keyof typeof COSMOS_KIT_WALLET_NAMES)[] = [
  "leap",
  "keplr",
  "metaMask",
  "cosmostation",
  "leap-mobile",
  "keplr-mobile",
  "leap-cosmos-capsule",
];

export const isFlask = async () => {
  const provider = (window as any).ethereum;

  try {
    const clientVersion = await provider?.request({
      method: "web3_clientVersion",
    });

    const isFlaskDetected = (clientVersion as string[])?.includes("MetaMask");

    return Boolean(provider && isFlaskDetected);
  } catch {
    return false;
  }
};

export function ConnectWalletSideCurtainContent({
  setOpen,
  isOpen,
  walletRepo,
}: WalletModalProps) {
  const { client } = useWalletClient();
  // const { search } = useLocation();

  const { mainWallet: { walletStatus } = {}, mainWallet } = useWallet();

  // const redirectedFromSnaps = search.includes("metamask");

  const _filteredWallets = useMemo(
    () =>
      walletRepo?.wallets.filter((wallet) => {
        return (
          SUPPORTED_WALLETS.includes(wallet.walletInfo.name) && true // (redirectedFromSnaps
          //   ? wallet.walletInfo.name === COSMOS_KIT_WALLET_NAMES["metaMask"]
          //   : true)
        );
      }),

    [walletRepo?.wallets]
  );

  const filteredWallets = useMemo(
    () =>
      walletOrder
        .map((key) => {
          // @ts-ignore
          const element: MainWalletBase = _filteredWallets.find(
            (wallet) => {
              return wallet.walletInfo.name === COSMOS_KIT_WALLET_NAMES[key] &&
              ["leap", "keplr", "metaMask", "leap-cosmos-capsule"].includes(key)
            }
          );
          return element;
        })
        .sort((a, b) => {
          return a?.walletInfo.name === b?.walletInfo.name ? -1 : 1;
        }),
    [_filteredWallets]
  );

  function onWalletClicked(wallet: MainWalletBase) {
    const { name } = wallet.walletInfo;
    return async () => {
      if (name === COSMOS_KIT_WALLET_NAMES["keplr"] && !window.keplr) {
        window.open(KEPLR_WALLET_EXTENSION_URL, "_blank");
      }

      if (
        name === COSMOS_KIT_WALLET_NAMES["cosmostation"] &&
        !window.cosmostation
      ) {
        window.open(COSMOSTATION_WALLET_EXTENSION_URL, "_blank");
      }

      if (name === COSMOS_KIT_WALLET_NAMES["leap"] && !window.leap) {
        window.open(LEAP_WALLET_EXTENSION_URL, "_blank");
      }

      if (name === COSMOS_KIT_WALLET_NAMES["metaMask"]) {
        const flaskInstalled = await isFlask();
        if (!flaskInstalled) {
          console.error(
            "Unable to find flask installed. Please install MetaMask Flask and complete Onboarding on Flask. If you have already installed MetaMask Flask, kindly make sure to disable all other ethereum wallets."
          );
          window.open(METAMASK_WALLET_EXTENSION_URL, "_blank");
          return;
        }
      }

      if (walletStatus === WalletStatus.Connected) {
        await mainWallet?.disconnect();
      }
      // if(name === COSMOS_KIT_WALLET_NAMES['leap-cosmos-capsule']) {
      //   const chainWallets = wallet?.getChainWalletList()
      //   if(chainWallets && chainWallets?.length !== 0) {
      //     const firstChainWallet = chainWallets[0];
      //     return await firstChainWallet.connect();
      //   }
      // }

      await wallet.connect();
      setOpen(false);
    };
  }

  return (
    <div className="flex w-[541px] max-w-[90vw] flex-col items-start justify-start rounded-[20px] bg-gray-50 shadow-[0px_7px_24px_0px_rgba(0,0,0,0.25)] dark:bg-gray-950">
      <div className="flex h-[55px] w-full flex-row items-center justify-between px-6 py-[9px]">
        <div className="text-left text-lg font-bold !leading-[28px] text-black-100 dark:text-white-100">
          Connect Wallet
        </div>

        <div
          className="material-icons-outlined flex !h-6 !w-6 cursor-pointer items-center justify-center p-1 text-gray-500 dark:text-gray-500"
          onClick={() => setOpen(false)}
        >
          <MdOutlineClose />
        </div>
      </div>
      <div className="flex w-full flex-col pb-6">
        <div className="flex flex-row items-center justify-start gap-1">
          <Text
            size="sm"
            color="text-black-100 dark:text-white-100"
            className="pl-6 pr-3 py-3"
          >
            New to Cosmos
          </Text>
          <HorizontalDivider outerClassName="flex-1 pr-6" />
        </div>
        {[
          filteredWallets[2],
          // {
          //   walletInfo: {
          //     name: COSMOS_KIT_WALLET_NAMES["leap-cosmos-capsule"],
          //     prettyName: "Google",
          //     logo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
          //   },
          // },
          filteredWallets[3]
        ]?.map((wallet, index: number) => {
          if (!wallet) {
            return null;
          }
          let {
            // eslint-disable-next-line prefer-const
            walletInfo: { name, prettyName, logo },
          } = wallet;
          if (name === COSMOS_KIT_WALLET_NAMES["metaMask"]) {
            prettyName = "MetaMask";
            logo =
              "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1024px-MetaMask_Fox.svg.png";
          }
          return (
            <div key={name + prettyName + index}>
              <ConnectWalletCard
                onWalletClicked={() => onWalletClicked(wallet as MainWalletBase)}
                name={name}
                logo={logo as string}
                prettyName={prettyName}
                // isComingSoon={
                //   name === COSMOS_KIT_WALLET_NAMES["leap-cosmos-capsule"]
                // }
              />
            </div>
          );
        })}
        <div className="flex flex-row items-center justify-start gap-1">
          <Text
            size="sm"
            color="text-black-100 dark:text-white-100"
            className="pl-6 pr-3 py-3"
          >
            Cosmos Pro
          </Text>
          <HorizontalDivider outerClassName="flex-1 pr-6" />
        </div>
        {filteredWallets.slice(0, 2)?.map((wallet, index: number) => {
          if (!wallet) {
            return null;
          }
          let {
            // eslint-disable-next-line prefer-const
            walletInfo: { name, prettyName, logo },
          } = wallet;
          if (name === COSMOS_KIT_WALLET_NAMES["metaMask"]) {
            prettyName = "MetaMask";
            logo =
              "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1024px-MetaMask_Fox.svg.png";
          }
          return (
            <div key={name + prettyName + index}>
              <ConnectWalletCard
                onWalletClicked={() => onWalletClicked(wallet)}
                name={name}
                logo={logo as string}
                prettyName={prettyName}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
