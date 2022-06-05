import mongoose from "mongoose";
import express from "express";
import {ApolloServer} from "apollo-server-express";
import {GraphQLFileLoader} from "@graphql-tools/graphql-file-loader";
import {loadSchema} from "@graphql-tools/load";
import {addResolversToSchema} from "@graphql-tools/schema";
import resolvers from "./resolvers";

const port = 3000;
mongoose.connect(
  "mongodb+srv://KhangDang:JRbjiD07mtOlb1WS@cluster0.78n8d.mongodb.net/?retryWrites=true&w=majority",
  async () => {
    console.log("connect to database successfully");


    const schema = await loadSchema("./**/*.graphql", {
      loaders: [new GraphQLFileLoader()]
    })

    const schemaWithResolver = addResolversToSchema({schema, resolvers})

    const server = new ApolloServer({schema: schemaWithResolver});
    const app = express();
    await server.start()
    server.applyMiddleware({ app });
    app.listen(port, () => {
      console.log("server start successfully");
    });
  }
);

/*app.post("/api/v1/users", saving.createUser);
    app.put("/api/v1/users", saving.updateUser);
    app.get("/api/v1/users", saving.getUser);*/
