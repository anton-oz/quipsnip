const typeDefs = `
    type Hello {
        hello: String
    }

    type Query {
        hello: Hello
    }
`;

module.exports = typeDefs;
