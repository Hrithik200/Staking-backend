export const TRANSFERS_QUERY = `
  {
    transfers(first: 50, orderBy: id, orderDirection: asc) {
      blockNumber
      blockTimestamp
      from
      id
      to
      transactionHash
      value
    }
  }
`;
