import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation Signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      token
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation Logout {
    logout
  }
`;

export const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      token
      success
    }
  }
`;

export const NEW_POST = gql`
  mutation Mutation(
    $user_id: ID!
    $type: String!
    $title: String!
    $editor: String!
  ) {
    newPost(user_id: $user_id, type: $type, title: $title, editor: $editor)
  }
`;
