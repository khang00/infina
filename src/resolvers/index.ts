import {Resolvers} from "../generated/graphql";
import {ObjectIDResolver} from "graphql-scalars";
import UserResolver from "./user";
import OrderResolver from "./order";

const resolvers: Resolvers = {
  ObjectID: ObjectIDResolver,
  Query: {
    user: UserResolver.user,
    getOrderById: OrderResolver.getOrderById,
    getOrderByUser: OrderResolver.getOrderByUser
  },
  Mutation: {
    createUser: UserResolver.createUser,
    updateUser: UserResolver.updateUser,
    createOrder: OrderResolver.createOrder,
  }
}
export default resolvers
