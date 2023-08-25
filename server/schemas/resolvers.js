const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
// addUser( username: String!, email: String!, password: String): Auth
// login( email: String!, password: String! ): Auth
// saveBook( authors: [String!], description: String!, title: String!, bookId: Int!, image: String!, link: String! ): User
// removeBook( bookId: Int! ): User
const resolvers = {
  Query: {
    me: async (_, { id }, context) => {
      if (context.user) {
        const id = context._id;
        const user = await User.findById(context.user._id)
        const token = await signToken(user);
        return  user;
      } else {
        throw new AuthenticationError('Not logged in.');
      }
    },
    users: async (_, args) => {
      return await User.find({});
    }
  },
  Mutation: {
    addUser: async (_, { username, email, password }) => {
     const user = await User.create({ username, email, password });
     const token = await signToken(user);

     return {user, token}
    },
    login: async (_, {email, password}) =>  {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Your username or password were incorrect.');
      }
      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError('Your username or password were incorrect.');
      }   

      const token = signToken(user);

      return { user, token };
    },
    // saveBook: async (_, { authors, description, title, bookId, image, link }, context) => {
    //   if (context.user) {
    //   }
    //   return user;
    // },
    // addThought: async (parent, { thoughtText }, context) => {
    //   if (context.user) {
    //     const thought = await Thought.create({
    //       thoughtText,
    //       thoughtAuthor: context.user.username,
    //     });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $addToSet: { thoughts: thought._id } }
    //     );

    //     return thought;
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },

  }
};

module.exports = resolvers;
