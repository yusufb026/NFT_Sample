import { gql } from "@apollo/client";

export const getNFTTokensQuery = gql`
  query Tokens(
    $collectionAddr: String!
    $limit: Int
    $offset: Int
    $filterForSale: SaleType
    $sortBy: TokenSort
  ) {
    tokens(
      collectionAddr: $collectionAddr
      limit: $limit
      offset: $offset
      filterForSale: $filterForSale
      sortBy: $sortBy
    ) {
      pageInfo {
        total
        limit
        offset
      }
      tokens {
        description
        name
        rarityOrder
        owner {
          address
        }
        collection {
          tokenCounts {
            total
          }
          media {
            type
            url
          }
          name
          contractAddress
        }
        listedAt
        listPrice {
          amount
          denom
        }
        media {
          type
          url
        }
        metadata
        traits {
          name
          rarity
          rarityPercent
          rarityScore
        }

        tokenId
        tokenUri
        saleType
        owner {
          address
        }
      }
    }
  }
`;

export const getNFTTokenByIDQuery = gql`
  query Token($collectionAddr: String!, $tokenId: String!) {
    token(collectionAddr: $collectionAddr, tokenId: $tokenId) {
      description
      name
      rarityOrder
      owner {
        address
      }
      collection {
        tokenCounts {
          total
        }
        media {
          type
          url
        }
        name
        contractAddress
      }
      listedAt
      listPrice {
        amount
        denom
      }
      media {
        type
        url
      }
      metadata
      traits {
        name
        rarity
        rarityPercent
        rarityScore
      }
      tokenId
      tokenUri
      saleType
      owner {
        address
      }
    }
  }
`;
