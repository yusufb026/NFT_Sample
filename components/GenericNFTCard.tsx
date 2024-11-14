import React, { useMemo } from "react";
import { useNFTImage } from "../hooks/useNFTImage";
import Text from "./Text";
import { formatNumber, fromSmall } from "../config/mathutils";
import Image from "next/image";
import ArrowNorthWest from "../public/arrow-north-west.svg";
import { MdAutoGraph } from "react-icons/md";

export const renderLiquidityButton = ({ onClick }: any) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-row bg-white-100 py-3 px-8 justify-center ml-auto rounded-3xl cursor-pointer"
    >
      <Text size="xs" color="text-black-100 text-center font-bold">
        {"Buy Now"}
      </Text>
    </button>
  );
};

type GenericCardProps = {
  nft: {
    image: string;
    media_type: string;
    name: string;
    tokenId: string;
    cta: string;
    listPrice: {
      amount: string;
      denom: string;
    };
    traits: {
      rarity: string;
      rarityScore: number;
      rarityPercent: number;
    };
    rarityOrder: number;
    collection: {
      name: string;
      image: string;
      media_type: string;
      tokenCount: number;
      contractAddress: string;
    };
  };
  onNFTClick: (
    nft: any,
    elementsTitle: string,
    elementsSubtitle: string,
    imgUrl?: string
  ) => void;
  balance?: string | null;
  isConnected?: boolean;
};

const Images = {
  Misc: {
    Sell: "https://assets.leapwallet.io/dashboard/images/misc/sell.svg",
  },
};

export function GenericNFTCard({
  nft,
  onNFTClick,
  balance,
  isConnected,
}: GenericCardProps) {
  const { imageComponent, imgUrl } = useNFTImage({
    image: nft.image,
    mediaType: nft.media_type,
    nftName: nft.name,
    classNamesProp: {
      img: "rounded-lg",
      video: "rounded-lg",
      skeleton: "rounded-lg",
      textDiv: "rounded-lg",
    },
  });

  const { imageComponent: collectionImageComponent } = useNFTImage({
    image: nft?.collection?.image ?? nft?.image ?? Images.Misc.Sell,
    mediaType: nft?.collection?.image
      ? nft?.collection?.media_type
      : nft?.media_type,
    nftName: nft?.collection?.name,
    fallbackImg: Images.Misc.Sell,
    classNamesProp: {
      img: "rounded-full",
      video: "rounded-full",
      skeleton: "rounded-full",
      textDiv: "rounded-full",
    },
  });

  const elementsTitle = `Buy ${nft.name}`;
  const elementsSubtitle = `Balance: ${formatNumber(
    fromSmall(balance ?? "0").decimalPlaces(3)
  )} STARS • You need ${formatNumber(
    fromSmall(nft.listPrice.amount).minus(fromSmall(balance ?? "0"))
  )} STARS more to buy this Bad Kid`;

  return (
    <div className="bg-gray-950 relative flex w-full sm:w-[calc(50%-12px)] md:w-[calc(33%-16px)] lg:w-[calc(25%-18px)] group flex-col items-center justify-start gap-[2px] sm:gap-3 rounded-2xl p-0 sm:!p-4 p-4 ease transition-all duration-300 border-[0] sm:border border-gray-100 dark:border-gray-900 hover:shadow-[0_7px_24px_0px_rgba(0,0,0,0.25)]">
      {imageComponent}
      <div className="absolute top-0 left-0 aspect-square w-full flex-col items-start justify-end p-5 ease transition-all duration-300 hidden group-hover:flex">
        <div className="flex shrink-0 flex-row items-center justify-end gap-1 rounded-full bg-gray-100 py-2 px-3 backdrop-blur-[10px] dark:bg-[#38383899]">
          <img
            src="https://assets.leapwallet.io/stars.png"
            alt="Stargaze"
            className="h-3 w-3"
          />
          <div className="text-[10px] !leading-3 text-gray-800 dark:text-gray-200">
            Stargaze
          </div>
        </div>
      </div>
      <div className="flex w-full flex-row items-start justify-between gap-2">
        <div className="flex w-[75%] flex-col items-start justify-start gap-[2px]">
          <div className="flex w-full flex-row items-center justify-start gap-1">
            <div className="h-5 w-5">{collectionImageComponent}</div>
            <div className="flex-row overflow-hidden hover:bg-gray-950 hover:left-10 hover:overflow-visible hover:absolute hover:pr-2 text-ellipsis whitespace-nowrap text-left text-base !leading-6 text-black-100 dark:text-white-100 font-bold">
              {nft?.name}
            </div>
          </div>
          <div className="flex w-full flex-row items-center justify-start gap-1">
            <MdAutoGraph color="#DB2777" size={20} className="font-bold" />
            <Text size="sm" color="text-[#DB2777]" className="font-bold">
              {nft?.rarityOrder}
            </Text>
            <Text size="sm" color="text-white-100">
              / {nft?.collection?.tokenCount}
            </Text>
          </div>
        </div>
        <div>
          <p className="text-right text-base !leading-6 text-black-100 dark:text-white-100 font-bold">
            {formatNumber(fromSmall(nft.listPrice.amount))}
          </p>
          <p className="text-right w-full text-base !leading-6 text-black-100 dark:text-white-100">
            STARS
          </p>
        </div>
      </div>
      <div className="w-full flex items-center">
        <button
          onClick={() =>
            window.open(
              `https://stargaze.zone/m/${nft.collection.contractAddress}/${nft.tokenId}`,
              "_blank"
            )
          }
          className="flex items-center justify-center h-[32px] w-[32px] bg-transparent border-white-100 border rounded-full cursor-pointer"
        >
          <Image src={ArrowNorthWest} alt="link" height={10} width={10} />
        </button>
        <button
          onClick={() =>
            onNFTClick(nft, elementsTitle, elementsSubtitle, imgUrl)
          }
          className="flex bg-white-100 py-3 px-8 w-[70%] justify-center ml-auto rounded-3xl cursor-pointer"
        >
          <Text size="xs" color="text-black-100 text-center font-bold">
            {"Buy Now"}
          </Text>
        </button>
      </div>
    </div>
  );
}
