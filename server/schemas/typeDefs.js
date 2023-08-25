const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
      _id: ID!
      username: String!
      bookCount: Int
      savedBooks: [Book]
  }

  type Book {
    bookId: String!
    authors: [String!]
    description: String!
    title: String!
    image: String
    link: String!
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    me( _id: ID ): User
    users: [User]
  }

  type Mutation {
      addUser( username: String!, email: String!, password: String!): Auth
      login( email: String!, password: String! ): Auth
      saveBook( authors: [String!], description: String!, title: String!, bookId: Int!, image: String!, link: String! ): User
      removeBook( bookId: Int! ): User
  }
`;

module.exports = typeDefs;
