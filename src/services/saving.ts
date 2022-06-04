import express from "express";
import Users from "../models/users";
import error from "./error";

interface UserRequest {
  full_name: string;
  phone: string;
  age: number;
  gender: string;
}

interface GetUserRequest {
  "_id": string;
}

interface UpdateUserRequest extends UserRequest {
  "_id": string;
}

interface UserResponse extends UserRequest {
  "_id": string;
}

const createUser = async (req: express.Request<UserRequest>, res: express.Response<UserResponse>) => {
  const user = new Users.UsersModel({
    ...req.body
  })
  user.save(error.databaseErrorHandler)

  return res.send(user);
};

const updateUser = async (req: express.Request<UpdateUserRequest>, res: express.Response<UserResponse>) => {
  const oldUser = req.body
  const user = await Users.UsersModel.findByIdAndUpdate(oldUser._id, oldUser.body).exec()
  return res.send(user)
}

const getUser = async (req: express.Request<GetUserRequest>, res: express.Response<UserResponse>) => {
  const user = await Users.UsersModel.findById(req.query._id).exec()
  return res.send(user)
}

export default {createUser, updateUser, getUser};
