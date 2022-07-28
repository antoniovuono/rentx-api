import express from "express";
import swaggerUI from "swagger-ui-express";

import { createConnection } from "./database";
import "./shared/container";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());

app.use(router);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

createConnection()
  .then(() => {
    console.log("Data source connected successfully");
  })
  .catch((error) => {
    console.log(`Error connecting to database: ${error.message}`);
  });

app.listen(3333, () => console.log("Server is running on port 3333"));
