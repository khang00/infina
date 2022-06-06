import Users from "../models/users";
import {UserInputError} from "apollo-server-express";
import Orders from "../models/orders";
import {MutationCreateOrderArgs, QueryGetOrderByIdArgs, QueryGetOrderByUserArgs} from "../generated/graphql";
import constant from "./constant";

/**
 * Create an order by its id
 *
 * @param _ - not use parameter
 * @param order - the content of the order
 * @returns the created order
 *
 */
const createOrder = async <Parent = {}>(_: Parent, {order}: MutationCreateOrderArgs) => {
  const user = await Users.UsersModel.findById(order.user).exec()
  if (!user) {
    throw new UserInputError("user not exist" + order.user)
  }

  const createdOrder = await Orders.OrdersModel.create(order)
  const monthSpan = new Date().getMonth() - new Date(createdOrder.createdAt).getMonth()
  return {
    _id: createdOrder._id,
    user: createdOrder.user,
    code: await genCode(constant.CodeGenSize),
    age: createdOrder.age,
    gender: createdOrder.gender,
    interest_rate: order.interest_rate,
    accrued_amount: calculateAccruedAmount(order.amount, order.interest_rate, monthSpan)
  }
}

/**
 * Query every order which belongs to a user
 *
 * @param _ - not use parameter
 * @param user - the id of the user
 * @returns the order with the predefined id
 *
 */
const getOrderByUser = async <Parent = {}>(_: Parent, {user}: QueryGetOrderByUserArgs) => {
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

/**
 * Query an order by its id
 *
 * @param _ - not use parameter
 * @param _id - the id of the order
 * @returns the order with the predefined id
 *
 */
const getOrderById = async <Parent = {}>(_: Parent, {_id}: QueryGetOrderByIdArgs) => {
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
}

/**
 * Calculate accrued amount of the order
 *
 * @param amount - the original amount the user deposit for the order
 * @param interestRatePerYear - interest rate per year of the order
 * @param numberOfMonth - number of month since the order is created
 * @returns an array of accrued amount respectively to each month
 *
 */
const calculateAccruedAmount = (amount: number, interestRatePerYear: number, numberOfMonth: number) => {
  const interestRatePerMonth = interestRatePerYear / 12

  return Array(numberOfMonth).fill(0).reduce((acc, _, index) => {
    if (acc.length == 0) {
      acc.push(amount + calculateInterest(amount, interestRatePerMonth))
    } else {
      acc.push(acc[index - 1] + calculateInterest(acc[index - 1], interestRatePerMonth))
    }

    return acc
  }, [])
}

/**
 * Calculate accrued amount of the order
 *
 * @param amount - the original amount
 * @param interestRate - interest rate
 * @returns the calculated interest
 *
 */
const calculateInterest = (amount: number, interestRate: number) => {
  return Math.round(amount * interestRate)
}
/**
 * Returns a random unique code.
 *
 * @remarks
 * the function use current number of order in a collection for the unique part and
 * use random function to generate the random part
 *
 * @param size - The length of the code to be generated
 * @returns The randomly generated unique code with length of size
 *
 */
const genCode = async (size: number) => {
  const ordersCount = await Orders.OrdersModel.find().estimatedDocumentCount()
  const ordersCountStr = ordersCount.toString()
  if (size - ordersCountStr.length > 0) {
    const randomDigits = Array(size - ordersCountStr.length).fill(0).map(_ => Math.floor(Math.random()))
    return randomDigits.toString() + ordersCountStr
  } else {
    const randomDigits = Array(size).fill(0).map(_ => Math.floor(Math.random()))
    return randomDigits.toString()
  }
}


export default {createOrder, getOrderByUser, getOrderById}
