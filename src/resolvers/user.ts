import {UserInputError} from "apollo-server-express";
import Users from "../models/users";
import {MutationCreateUserArgs, MutationUpdateUserArgs, QueryUserArgs} from "../generated/graphql";

/**
 * Create a user
 *
 * @param _ - not use parameter
 * @param user - the user to be created
 * @returns the created user
 *
 */
const createUser = async <Parent = {}>(_: Parent, {user}: MutationCreateUserArgs) => {
  if (user.phone && !validatePhoneNumber(user.phone)) {
    throw new UserInputError("wrong phone number format" + user.phone)
  }

  return await Users.UsersModel.create(user)
}

/**
 * Update a user
 *
 * @param _ - not use parameter
 * @param user - the field of a user to be updated
 * @returns the updated user
 *
 */
const updateUser = async <Parent = {}>(_: Parent, {user}: MutationUpdateUserArgs) => {
  if (user.phone && !validatePhoneNumber(user.phone)) {
    throw new UserInputError("wrong phone number format" + user.phone)
  }

  return await Users.UsersModel.findByIdAndUpdate(user._id, user).exec()
}

/**
 * Query a user by its id
 *
 * @param _ - not use parameter
 * @param _id - the id of a user
 * @returns the user with the predefined _id
 *
 */
const user = async <Parent = {}>(_: Parent, {_id}: QueryUserArgs) => {
  return await Users.UsersModel.findById(_id).exec()
}

/**
 * Validate if a phone have a VietNam phone format
 *
 * @remarks
 * The phone is correct if it has 10 number and start with "09"
 *
 * @param phone - The phone number to be validated
 * @returns whether the phone is correct
 *
 */
const validatePhoneNumber = (phone: string) => /^09\d{8}$/.test(phone)

export default {createUser, updateUser, user}
