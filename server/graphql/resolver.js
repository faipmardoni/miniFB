const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userModel = require('../models/users.model');
const statusModel = require('../models/status.model');
const commentModel = require('../models/comments.model');
const resolvers = {
  Query: {
    users: async (_, params, { user }) => {
      try {
        // if (user) {
          let users = await userModel.find();
          return users;
        // } else {
        //   throw new Error('You are not permitted');
        // }
      }
      catch (error) {
        throw new Error('error')
      }
    },
    me: async (_, params, { user }) => {
      try {
        if (!user) throw new Error('You are not permitted');
        let userLogin = await userModel
          .findById(user.id)
          .populate({
            path: 'statuses',
            populate: {
              path: 'comments'
            }
          })
          .populate('user')
          .populate('comments')
          .exec()
        return userLogin
      } catch (error) {
        console.error(error)
      }
    },
    statuses: async (_, params, { user }) => {
      try {
        if (!user) throw new Error('Please login first');
        const statuses = await statusModel
          .find()
          .populate({
            path: 'comments',
            populate: {
              path: 'user'
            }
          })
          .populate('user')
          .populate('likes')
          .exec()
        return statuses;
      } catch (error) {
        console.error(error)
      }
    }
  },
  Mutation: {
    registerUser: async (_, params) => {
      try {
        let newUser = await userModel.create(params)
        return newUser
      } catch (error) {
        throw new Error('error')
      }
    },

    login: async (_, { email, password }) => {
      try {
        const user = await userModel.findOne({ email })
        if (!user) {
          throw new Error('User not found');
        };

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          throw new Error('Wrong Password');
        };

        let payload = {
          id: user._id,
          name: user.name,
          email: user.email,
        }

        const token = jwt.sign(payload, process.env.KEYPASS)

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          token
        }
      } catch (error) {
        console.error(error)
      }
    },

    addStatus: async (_, params, { user }) => {
      try {
        if (!user) throw new Error('You are not permitted');
        const newStatus = await statusModel.create({
          status: params.status,
          user: user.id
        })
        if (!newStatus) {
          throw new Error('Failed add Status');
        }
        await userModel.findByIdAndUpdate(params.user, {
          $push: {
            statuses: newStatus._id
          }
        })
        return newStatus
      } catch (error) {
        console.error(error)
      }
    },

    deleteStatus: async (_, { userId, _id }, { user }) => {
      try {
        if (!user || user.id != userId) throw new Error('You are not permitted');
        const deletedStatus = await statusModel.findByIdAndRemove(_id).exec();
        return deletedStatus
      } catch (error) {
        console.error(error)
      }
    },

    editStatus: async (_, { userId, _id, status }, { user }) => {
      try {
        if (!user || user.id != userId) throw new Error('You are not permitted');
        const editedStatus = await statusModel.findByIdAndUpdate(_id, {
          status
        });
        return editedStatus;
      } catch (error) {
        console.error(error)
      }
    },

    addComment: async (_, { comment, status }, { user }) => {
      try {
        if (!user) throw new Error('You are not permitted');
        const newComment = await commentModel.create({
          comment, user, status
        });
        userModel.findByIdAndUpdate(user, {
          $push: {
            comments: newComment._id
          }
        });
        statusModel.findByIdAndUpdate(status, {
          $push: {
            comments: newComment._id
          }
        })
        return newComment
      } catch (error) {
        console.error(error)
      }
    },

    deleteComment: async (_, { _id, userId }, { user }) => {
      try {
        if (!user || user.id != userId) throw new Error('You are not permitted');
        const deletedComment = await commentModel.findByIdAndRemove(_id).exec();
        if (!deletedComment) {
          throw new Error('Error');
        }

        userModel.findByIdAndUpdate(user, {
          $pop: {
            comments: _id
          }
        })

        statusModel.findByIdAndUpdate(status, {
          $pop: {
            comments: _id
          }
        })
        return deletedComment
      } catch (error) {
        console.error(error)
      }
    },

    editComment: async (_, { _id, comment, userId }, { user }) => {
      try {
        if (!user || user.id != userId) throw new Error('You are not permitted');
        const editedComment = await commentModel.findByIdAndUpdate(_id, {
          comment
        });
        if (!editedComment) {
          throw new Error('Error')
        };
        return editedComment;
      } catch (error) {
        console.error(error)
      }
    },
    like: async (_, { status }, { user }) => {
      try {
        const hasLike = await statusModel.findOne({
          likes: user.id
        })
        if (hasLike) throw new Error('User has liked before')
        const addLiketoStatus = await statusModel.findByIdAndUpdate(status, {
          $push: {
            likes: user.id
          }
        })
        await userModel.findByIdAndUpdate(user.id, {
          $push: {
            likes: status
          }
        })
        return addLiketoStatus
      } catch (error) {
        console.error(object)
      }
    },
    dislike: async (_, { status }, { user }) => {
      try {
        const removeLikeFromStatus = await statusModel.findByIdAndUpdate(status, {
          $pop: {
            likes: user.id
          }
        })

        userModel.findByIdAndUpdate(user.id, {
          $pop: {
            likes: status
          }
        })

        if (!removeLikeFromStatus) throw new Error('Error')

        return removeLikeFromStatus
      } catch (error) {
        console.error(error)
      }
    }
  }
};

module.exports = resolvers