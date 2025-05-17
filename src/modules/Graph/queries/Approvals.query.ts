export const APPROVALS_QUERY = `
  {
    approvals(first: 5) {
      id
      owner
      spender
      value
    }
  }
`;
