
export const OWNERSHIP_TRANSFER_QUERY=
`{
  ownershipTransferreds(first: 5, orderBy: id, orderDirection: asc) {
    id
    previousOwner
    newOwner
    blockNumber
    transactionHash
  }
}`