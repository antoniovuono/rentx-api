import express from "express";

import { categoriesRoutes } from "./routes/cetegories.routes";

const app = express();

app.use(express.json());

app.use("/categories", categoriesRoutes);

app.listen(3333, () =>
  console.log({ message: "Server is ruining on port 3333" })
);