import {Resolvers} from "../generated/graphql";
import Users from "../models/users";
import {ObjectIDResolver} from "graphql-scalars";
import Orders from "../models/orders";

const resolvers: Resolvers = {
  ObjectID: ObjectIDResolver,
  Query: {
    async user(_, {_id}) {
      return await Users.UsersModel.findById(_id).exec()
    },
    async getOrderById(_, {_id}) {
      return await Orders.OrdersModel.findById(_id).exec()
    },
    async getOrderByUser(_, {user}) {
      return await Orders.OrdersModel.find({user: user}).exec()
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
