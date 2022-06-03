import mongoose from "mongoose";

(async () => {
  await mongoose.connect(
    "mongodb+srv://KhangDang:JRbjiD07mtOlb1WS@cluster0.78n8d.mongodb.net/?retryWrites=true&w=majority",
    () => {
      console.log("connect to database successfully");
    }
  );
})();
