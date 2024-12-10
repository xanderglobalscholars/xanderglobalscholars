const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello: {
      type: GraphQLString,
      resolve() {
        return 'Hello, Xander Global Scholars!';
      },
    },
  },
});

// Schema
module.exports = new GraphQLSchema({
  query: RootQuery,
});
