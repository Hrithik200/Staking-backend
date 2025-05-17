// src/Graph/services/FetchValuesServiceGraph.ts
import { graphqlRequest } from "../utils/GraphqlClient";
import { APPROVALS_QUERY } from "../queries/Approvals.query";
import { TRANSFERS_QUERY } from "../queries/Transfers.query";
import { OWNERSHIP_TRANSFER_QUERY } from "../queries/OwnershipTransfer.query";

export class FetchValuesServiceGraph {
  static async getApprovals() {
    return graphqlRequest(APPROVALS_QUERY);
  }

  static async getTransfers() {
    return graphqlRequest(TRANSFERS_QUERY);
  }

  static async getOwnershipTransfer(){
    return graphqlRequest(OWNERSHIP_TRANSFER_QUERY);
  }

}
