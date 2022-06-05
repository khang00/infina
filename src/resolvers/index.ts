import {OrderResult, Resolvers} from "../generated/graphql";
import Users from "../models/users";
import {ObjectIDResolver} from "graphql-scalars";
import Orders from "../models/orders";
import calculateAccruedAmount from "./order";

const resolvers: Resolvers = {
  ObjectID: ObjectIDResolver,
  Query: {
    async user(_, {_id}) {
      return await Users.UsersModel.findById(_id).exec()
    },
    async getOrderById(_, {_id}) {
      const order = await Orders.OrdersModel.findById(_id).exec()
      if (!order) {
        return {}
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
        return []
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
      return await Users.UsersModel.create(user)
    },
    async updateUser(_, {user}) {
      return await Users.UsersModel.findByIdAndUpdate(user._id, user).exec()
    },
    async createOrder(_, {order}) {
      const user = await Users.UsersModel.findById(order.user).exec()
      if (!user) {
        return {}
      }
      return await Orders.OrdersModel.create(order)
    }
  }
}
export default resolvers
