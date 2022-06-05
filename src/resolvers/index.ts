import {Resolvers} from "../generated/graphql";
import Users from "../models/users";
import {ObjectIDResolver} from "graphql-scalars";

const resolvers: Resolvers = {
  ObjectID: ObjectIDResolver,
  Mutation: {
    createUser: async (parent, {user}) => {
      const savedUser = await Users.UsersModel.create(user)
      console.log(user, savedUser)
      return savedUser
    }
  }
}


export default resolvers
