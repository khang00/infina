import {OrderResult, Resolvers} from "../generated/graphql";
import Users from "../models/users";
import {ObjectIDResolver} from "graphql-scalars";
import Orders from "../models/orders";
import calculateAccruedAmount from "./order";
import {UserInputError} from "apollo-server-express";
import validatePhoneNumber from "./user";

const resolvers: Resolvers = {
  ObjectID: ObjectIDResolver,
  Query: {
    async user(_, {_id}) {
      return await Users.UsersModel.findById(_id).exec()
    },
    async getOrderById(_, {_id}) {
      const order = await Orders.OrdersModel.findById(_id).exec()
      if (!order) {
        throw new UserInputError("not found oder for id" + _id)
      }

      const monthSpan = new Date().getMonth() - new Date(order.createdAt).getMonth()
      return {
        _id: order._id,
        user: order.user,
        code: order.code,
        age: order.age,
        gender: order.gender,
        interest_rate: order.interest_rate,
        accrued_amount: calculateAccruedAmount(order.amount, order.interest_rate, monthSpan)
      }
    },
    async getOrderByUser(_, {user}) {
      const orders = await Orders.OrdersModel.find({user: user}).exec()
      if (!orders) {
        throw new UserInputError("not found oder for user" + user)
      }

      return orders.map(order => {
        const monthSpan = new Date().getMonth() - new Date(order.createdAt).getMonth()
        return {
          _id: order._id,
          user: order.user,
          code: order.code,
          age: order.age,
          gender: order.gender,
          interest_rate: order.interest_rate,
          accrued_amount: calculateAccruedAmount(order.amount, order.interest_rate, monthSpan)
        }
      })
    }
  },
  Mutation: {
    async createUser(_, {user}) {
      if (user.phone && !validatePhoneNumber(user.phone)) {
        throw new UserInputError("wrong phone number format" + user.phone)
      }

      return await Users.UsersModel.create(user)
    },
    async updateUser(_, {user}) {
      if (user.phone && !validatePhoneNumber(user.phone)) {
        throw new UserInputError("wrong phone number format" + user.phone)
      }

      return await Users.UsersModel.findByIdAndUpdate(user._id, user).exec()
    },
    async createOrder(_, {order}) {
      const user = await Users.UsersModel.findById(order.user).exec()
      if (!user) {
        throw new UserInputError("user not exist" + order.user)
      }

      const createdOrder = await Orders.OrdersModel.create(order)
      const monthSpan = new Date().getMonth() - new Date(createdOrder.createdAt).getMonth()
      return {
        _id: createdOrder._id,
        user: createdOrder.user,
        code: createdOrder.code,
        age: createdOrder.age,
        gender: createdOrder.gender,
        interest_rate: order.interest_rate,
        accrued_amount: calculateAccruedAmount(order.amount, order.interest_rate, monthSpan)
      }
    }
  }
}
export default resolvers
