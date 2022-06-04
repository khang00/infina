import mongoose from "mongoose";
import express from "express";
import saving from "./services/saving";

(async () => {
  const port = 3000;

  mongoose.connect(
    "mongodb+srv://KhangDang:JRbjiD07mtOlb1WS@cluster0.78n8d.mongodb.net/?retryWrites=true&w=majority",
    () => {
      console.log("connect to database successfully");
    }
  );

  const app = express();
  app.use(express.json())
  app.post("/api/v1/users", saving.createUser);
  app.put("/api/v1/users", saving.updateUser);
  app.get("/api/v1/users", saving.getUser);

  app.listen(port, () => {
    console.log("server start successfully");
  });
})();
