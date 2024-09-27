import { gql } from "@apollo/client";

export const HELLO_QUERY = gql`
  query HelloQuery {
    hello
  }
`;

export const GET_PROFILES = gql`
  query GetProfiles {
    profiles {
      username
    }
  }
`;

export const GET_POSTS = gql`
  query Posts {
    posts {
      user {
        username
      }
      type
      title
      comments {
        text
        user {
          username
        }
      }
      code
    }
  }
`;
