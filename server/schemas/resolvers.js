const { User } = require('../models');

// addUser( username: String!, email: String!, password: String): Auth
// login( email: String!, password: String! ): Auth
// saveBook( authors: [String!], description: String!, title: String!, bookId: Int!, image: String!, link: String! ): User
// removeBook( bookId: Int! ): User
const resolvers = {
  Query: {
    me: async (_, args) => {
      return User.find(User, { id: args.id });
    },
    users: async (_, args) => {
      let id = args.id; // Use args.id here
      return await User.find(User, { id });
    }
  }
};

module.exports = resolvers;
