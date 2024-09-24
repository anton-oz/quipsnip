const typeDefs = `#graphql

    type Profile {
        _id: ID!
        username: String 
        password: String
    }

    type Auth {
        token: ID!
        profile: Profile
    }

    type Query {
        profile(username: String!): Profile
        profiles: [Profile]!
        hello: String
    }

    type Mutation {
        login(username: String!, password: String!): Auth
    }

`;

export default typeDefs;
