const User = require("../models/User"); // User model
const Post = require("../models/Post"); // Post model

const resolvers = {
  Query: {
    // Fetch all users
    getUsers: async () => {
      return await User.find();
    },
    // Fetch all posts with authors
    getPosts: async () => {
      return await Post.find().populate("author");
    },
  },

  Mutation: {
    // Create a new user
    createUser: async (_, { name, email }) => {
      const user = new User({ name, email });
      return await user.save();
    },

    // Create a new post
    createPost: async (_, { title, content, authorId }) => {
      const post = new Post({ title, content, author: authorId });
      return await post.save();
    },
  },

  // Resolve author field in Post type
  Post: {
    author: async (post) => {
      return await User.findById(post.author);
    },
  },
};

module.exports = resolvers;
