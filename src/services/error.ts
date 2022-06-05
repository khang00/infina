import mongoose from "mongoose";

const databaseErrorHandler = (err: mongoose.Error) => {
  if (err) {
    console.log(err)
  }
}

export default {databaseErrorHandler}
