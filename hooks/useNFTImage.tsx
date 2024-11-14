import classNames from "classnames";
import Image from "next/image";

import React, { useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";

import LoaderGif from "../public/badfroge.gif";
const VIDEO_EXTENSIONS = ["mp4", "webm", "ogg"];

export function imgOnError(defaultTokenLogo: string) {
  return function ({ currentTarget }: { currentTarget: HTMLImageElement }) {
    currentTarget.onerror = null;
    currentTarget.src = defaultTokenLogo;
  };
}

export const normalizeImageSrc = (src?: string) => {
  return src?.startsWith("ipfs://")
    ? src?.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/")
    : src;
};

export function useNFTImage({
  image,
  mediaType,
  nftName,
  classNamesProp,
  fallbackImg = `https://assets.leapwallet.io/dashboard/images/logos/generic-light.svg`,
  videoOptions = { autoPlay: false, showControls: false },
}: {
  image?: string;
  mediaType?: string;
  nftName?: string;
  classNamesProp?: {
    skeleton?: string;
    img?: string;
    video?: string;
    textDiv?: string;
  };
  fallbackImg?: string;
  videoOptions?: {
    autoPlay?: boolean;
    showControls?: boolean;
  };
}) {
  const [isImageLoading, setImageLoading] = useState<boolean>(
    image ? true : false
  );

  const isVideo =
    (image &&
      typeof image === "string" &&
      VIDEO_EXTENSIONS.includes(image?.split(".")?.slice(-1)?.[0])) ||
    mediaType?.includes("video");

  const imgUrl = useMemo(() => {
    const src = (image as string | undefined)?.replace(
      "ipfs.stargaze.zone",
      "ipfs-gw.stargaze-apis.com"
    );
    return normalizeImageSrc(src);
  }, [image]);

  const imageComponent = useMemo(
    () => (
      <>
        {isImageLoading && (
          <div
            className={classNames(
              "aspect-square w-full",
              classNamesProp?.skeleton
            )}
          >
            <Image src={LoaderGif} alt="Loading..." />
          </div>
        )}
        {isVideo ? (
          <video
            loop
            controls={videoOptions?.showControls ?? false}
            autoPlay={videoOptions?.autoPlay ?? false}
            className={classNames(
              "aspect-square rounded-[4px] object-contain",
              classNamesProp?.video
            )}
            onCanPlay={() => setImageLoading(false)}
            style={isImageLoading ? { display: "none" } : {}}
          >
            <source src={imgUrl}></source>
          </video>
        ) : imgUrl ? (
          <img
            src={imgUrl}
            className={classNames(
              "aspect-square w-full rounded-[4px] object-contain",
              classNamesProp?.img
            )}
            onLoad={() => setImageLoading(false)}
            style={isImageLoading ? { display: "none" } : {}}
            alt={`nft-image: ${imgUrl}`}
            onError={imgOnError(fallbackImg)}
          />
        ) : (
          <div
            className={classNames(
              "flex aspect-square w-full items-center justify-center rounded-[4px] bg-gray-200 dark:bg-gray-800",
              classNamesProp?.textDiv
            )}
            style={{ backgroundColor: "#2991D7" }}
          >
            {!nftName ? (
              <div
                className={classNames(
                  "aspect-square w-full",
                  classNamesProp?.skeleton
                )}
              >
                <Skeleton
                  containerClassName="w-full h-full !leading-none !block"
                  className="h-full w-full"
                />
              </div>
            ) : (
              <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-md font-bold text-black-100 dark:text-white-100">
                {nftName}
              </div>
            )}
          </div>
        )}
      </>
    ),
    [
      classNamesProp?.img,
      classNamesProp?.skeleton,
      classNamesProp?.textDiv,
      classNamesProp?.video,
      fallbackImg,
      imgUrl,
      isImageLoading,
      isVideo,
      nftName,
      videoOptions?.autoPlay,
      videoOptions?.showControls,
    ]
  );

  if (typeof image !== "string") {
    return {
      isImageLoading: false,
      setImageLoading,
      isVideo: false,
      imgUrl: "",
      imageComponent: (
        <>
          <img
            src={""}
            className={classNames(
              "aspect-square w-full rounded-[4px] object-contain",
              classNamesProp?.img
            )}
            onLoad={() => setImageLoading(false)}
            style={isImageLoading ? { display: "none" } : {}}
            alt={`nft-image: ${""}`}
            onError={imgOnError(fallbackImg)}
          />
        </>
      ),
    };
  }

  return { isImageLoading, setImageLoading, isVideo, imgUrl, imageComponent };
}
