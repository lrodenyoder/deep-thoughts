const { User, Thought } = require('../models');

//resolvers accept four arguments in order: 1. parent: used with nested resolvers. 2. args: object of all values passed into a query. 3. context: used for data needed to be accessible to all resolvers. 4. info: extra info about operations current state

const resolvers = {
    Query: {
        thoughts: async (parent, { username }) => {
            //ternary operator to check if username exists. if not, empty object is returned
            const params = username ? { username } : {};
            return Thought.find(params).sort({createdAt: -1})
        },
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts')
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
              .select("-__v -password")
              .populate("friends")
              .populate("thoughts");
        }
    }
};

module.exports = resolvers; 