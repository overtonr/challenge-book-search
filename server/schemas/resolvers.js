const { AuthenticationError } = require('apollo-server-express');

const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
Query: {
    user: async (parent, { user}) => {
        return User.findOne({$or: [{ _id: user ? user._id : params.id }, { username: params.username }]});
    },

}
};