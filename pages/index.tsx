import { Toaster } from "react-hot-toast";
import { NFTs } from "../components/NFTList";
import { ListControl } from "../components/ListControl";
import { Header } from "../components/Header";
import router, { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { isValidAddressWithPrefix } from "../config/validateAddress";
import { isMobile } from "react-device-detect";
import CheckOnDesktop from "../public/check-on-desktop.svg";
import Image from "next/image";
import { useChain } from "@cosmos-kit/react";
import { AccountModal, Actions, defaultBlurs, defaultBorderRadii } from "@leapwallet/embedded-wallet-sdk-react";

export default function Home() {
  const [collection, setCollection] = useState<string | undefined>();
  const router = useRouter();

  const {
    status: walletConnectStatus,
    address,
    chain,
  } = useChain('stargaze');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const restURL = chain?.apis?.rest?[0] && chain?.apis?.rest[0].address : '' ;
  const chainId = chain?.chain_id || 'stargaze-1';

  const ClientAccountModal = () => {
    const ref = useRef()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      ref.current = document.querySelector("body") as unknown as undefined;
      setMounted(true)
    }, [])

    const theme = {
      colors: {
        primary: "#fff",
        border: "#fff",
        stepBorder: "#E8E8E8",
        backgroundPrimary: "#141414",
        backgroundSecondary: "#212121",
        text: "#fff",
        textSecondary: "#858585",
        gray: "#9ca3af",
        alpha: "#ffffff",
        error: "#420006",
        errorBackground: "#FFEBED",
        success: "#29A874",
        successBackground: "#DAF6EB",
      },
      borderRadii: defaultBorderRadii,
      blurs: defaultBlurs,
      fontFamily: "inherit",
    };

    const navigate = (path:string) => {
      window.open(`https://cosmos.leapwallet.io${path}`)
    }

    return (mounted && isModalOpen) ? 
                  <AccountModal
                    theme={theme}
                    chainId={chainId}
                    restUrl={restURL}
                    address={address || ''}
                    isOpen={isModalOpen}
                    onClose={()=>{ setIsModalOpen(false) }}
                    config={{
                      actionListConfig: {
                        [Actions.SEND]: {
                          onClick: (chainId) =>
                            navigate(
                              `/transact/send?sourceChainId=${chainId}`,
                            ),
                        },
                        [Actions.IBC]: {
                          onClick: (chainId) =>
                            navigate(
                              `/transact/send?sourceChainId=${chainId}`,
                            ),
                        },
                        [Actions.SWAP]: {
                          onClick: (chainId) =>
                            navigate(
                              `/transact/swap?sourceChainId=${chainId}`,
                            ),
                        },
                        [Actions.BRIDGE]: {
                          onClick: (chainId) =>
                            navigate(
                              `/transact/bridge?destinationChainId=${chainId}`,
                            ),
                        },
                        [Actions.BUY]: {
                          onClick: (chainId) =>
                            navigate(
                              `/transact/buy?destinationChainId=${chainId}`,
                            ),
                        },
                      },
                    }}
                  /> : null
}

  useEffect(() => {
    if (typeof router.query.collectionAddress === "string") {
      if (isValidAddressWithPrefix(router.query.collectionAddress, "stars")) {
        setCollection(router.query.collectionAddress);
      }
    }
  }, [router.query]);

  return (
    <>
      {isMobile ? (
        <div className="h-[100vh] w-[100vw] justify-center items-center p-10">
          <Image src={CheckOnDesktop} alt="get stars" className="m-auto" />
        </div>
      ) : (
        <div>
          <Header  openEmbeddedWalletModal= { () => { setIsModalOpen(true) }} />
          <div className="px-10 sm:px-14 justify-center align-middle items-center self-center origin-center">
            <NFTs collection={collection} />
            <Toaster position="bottom-right" />
          </div>
          <ClientAccountModal />
        </div>
      )}
    </>
  );
}
