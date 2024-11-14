import React from "react";

import LoaderGif from "../public/badfroge.gif";
import Image from "next/image";

function GenericNFTCardSkeleton() {
  return (
    <div
      id="nft-card"
      className="animate-pulse bg-gray-950  relative  w-full sm:w-[calc(50%-12px)] md:w-[calc(33%-16px)] lg:w-[calc(25%-18px)] group flex-col items-center justify-start gap-[2px] sm:gap-3 rounded-2xl sm:!p-4 p-4 ease transition-all duration-300 border-[0] sm:border border-gray-100 dark:border-gray-900 hover:shadow-[0_7px_24px_0px_rgba(0,0,0,0.25)] "
    >
      <div className="flex-1 space-y-4 py-1">
        <Image src={LoaderGif} alt="Loading..." />
        {/* <div
          id="nft-image"
          className=" bg-gray-300 rounded aspect-square"
        ></div> */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
        <div className="flex flex-row space-y-2 mt-auto">
          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 ml-auto"></div>
        </div>
      </div>
    </div>
  );
}

export default GenericNFTCardSkeleton;
