import Image from "next/image";
import Search from "../public/search.svg";
import Sort from "../public/sort.svg";
import { MdSort, MdCancel } from "react-icons/md";

import Text from "../components/Text";
import { SORT_ORDERS } from "./NFTList";

export function ListControl({
  searchTerm,
  handleSearchChange,
  sortOrder,
  handleSortChange,
}: {
  searchTerm: string;
  handleSearchChange: (e: string) => void;
  sortOrder: SORT_ORDERS;
  handleSortChange: (e: SORT_ORDERS) => void;
}) {
  return (
    <section className="w-[90vw] gap-3 flex-row flex flex-wrap justify-between sm:!p-6">
      <div className="flex flex-col flex-wrap">
        <Text size="md">Collection of 9,999 bad drawings of kids. </Text>
        <Text size="md">
          Some people like the pictures and some people are bad kids themselves.
        </Text>
      </div>
      <div className="ml-auto flex items-center flex-wrap gap-3 justify-center bg-gray-950 px-4 py-2 rounded-3xl text-white-100 ">
        <Image src={Search} alt="search" />
        <input
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="bg-gray-950  text-white-100 border-none outline-none"
          style={{ boxShadow: "-11px 15px 23.4px 0px rgba(0, 0, 0, 0.41)" }}
          placeholder="Search by Token ID"
        />
        {searchTerm && (
          <MdCancel
            className="cursor-pointer"
            onClick={() => handleSearchChange("")}
          />
        )}
      </div>
      <div className="flex items-center  flex-wrap gap-3 justify-center bg-gray-950 px-4 py-2 rounded-3xl text-white-100 ">
        <MdSort color="#FFF" />
        <select
          value={sortOrder}
          onChange={(event) =>
            handleSortChange(event.target.value as SORT_ORDERS)
          }
          className="bg-gray-950  text-white-100 outline-none"
          style={{ boxShadow: "-11px 15px 23.4px 0px rgba(0, 0, 0, 0.41)" }}
        >
          <option value={"PRICE_ASC"}>Price low to high</option>
          <option value={"PRICE_DESC"}>Price high to low</option>
          <option value={"RARITY_DESC"}> Least Rare</option>
          <option value={"RARITY_ASC"}> Most Rare</option>
          <option value={"NAME_ASC"}>Name A-Z</option>
          <option value={"NAME_DESC"}>Name Z-A</option>
          <option value={"COLLECTION_ADDR_TOKEN_ID_ASC"}>Lowest ID</option>
          <option value={"TOKEN_ID_DESC"}>Highest ID</option>
          <option value={"LISTED_DESC"}>Recently Listed</option>
        </select>
      </div>
    </section>
  );
}
