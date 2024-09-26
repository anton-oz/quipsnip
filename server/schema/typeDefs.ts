const typeDefs = `#graphql

    type Profile {
        _id: ID!
        username: String!
        password: String!
    }

    type Auth {
        token: ID!
        # profile: Profile!
    }

    type Post {
        _id: ID!
        user: Profile
        type: String!
        title: String!
        code: String!
        comments: [Comment]
    }

    type Comment {
        _id: ID!
        text: String!
        user: Profile!
    }

    type Query {
        profile(username: String!): Profile
        profiles: [Profile]!
        posts: [Post]
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        signup(username: String!, password: String!): Auth
        refreshToken: Auth
    }

`;

export default typeDefs;
