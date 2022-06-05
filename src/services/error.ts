import mongoose from "mongoose";

const databaseErrorHandler = (err: mongoose.Error, obj :any) => {
  if (err) {
    console.log(err, obj)
  }
}

export default {databaseErrorHandler}
