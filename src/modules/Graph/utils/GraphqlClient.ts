import dotenv from 'dotenv';
import axios from "axios";
dotenv.config();

// const GRAPHQL_API = process.env.GRAPHQL!;
const GRAPHQL_API = "https://api.studio.thegraph.com/query/110411/staking/version/latest";

export const graphqlRequest = async (query: string, variables = {}) => {
    try {
        const response = await axios.post(GRAPHQL_API, { query, variables });

        if (response.data.errors) {
            console.error("GraphQL Errors:", response.data.errors);
            throw new Error("GraphQL query failed");
        }

        return response.data.data;
    } catch (error) {
        console.error("GraphQL Error:", error);
        throw error;
    }
};
