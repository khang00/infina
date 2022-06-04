import mongoose from "mongoose";
import express from "express";

(async () => {
  const port = 3000;

  await mongoose.connect(
    "mongodb+srv://KhangDang:JRbjiD07mtOlb1WS@cluster0.78n8d.mongodb.net/?retryWrites=true&w=majority",
    () => {
      console.log("connect to database successfully");
    }
  );

  const app = express();

  app.listen(port, () => {
    console.log("server start successfully");
  });
})();
