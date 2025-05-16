// src/services/staking.service.ts
import axios from "axios";

const GRAPHQL_API = "https://api.studio.thegraph.com/query/110411/staking/version/latest";

export class FetchValueGraph {
  static async fetchApproveData() {

    const query = `
      {
        approvals(first: 5) {
           id
    owner
    spender
    value
         
        }
      }
    `;

    const response = await axios.post(GRAPHQL_API, { query });

    if (response.data.errors) {
      console.error("GraphQL Errors:", JSON.stringify(response.data.errors, null, 2));
      throw new Error("GraphQL query failed");
    }

    console.log("GraphQL Data:", response.data.data);
    return response.data.data;

  }
}
