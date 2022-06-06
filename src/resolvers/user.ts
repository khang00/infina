import {UserInputError} from "apollo-server-express";
import Users from "../models/users";
import {MutationCreateUserArgs, MutationUpdateUserArgs, QueryUserArgs} from "../generated/graphql";

const createUser = async <Parent = {}>(_: Parent, {user}: MutationCreateUserArgs) => {
  if (user.phone && !validatePhoneNumber(user.phone)) {
    throw new UserInputError("wrong phone number format" + user.phone)
  }

  return await Users.UsersModel.create(user)
}

const updateUser = async <Parent = {}>(_: Parent, {user}: MutationUpdateUserArgs) => {
  if (user.phone && !validatePhoneNumber(user.phone)) {
    throw new UserInputError("wrong phone number format" + user.phone)
  }

  return await Users.UsersModel.findByIdAndUpdate(user._id, user).exec()
}

const user = async <Parent = {}>(_: Parent, {_id}: QueryUserArgs) => {
  return await Users.UsersModel.findById(_id).exec()
}

const validatePhoneNumber = (phone: string) => /^\d{10}$/.test(phone)

export default {createUser, updateUser, user}
