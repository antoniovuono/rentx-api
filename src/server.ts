import express from "express";

const app = express();

app.get("/", (request, response) => {
  const message1 = "Bem vindo ao rentx";
  return response.json({ message: message1 });
});

app.listen(3333, () =>
  console.log({ message: "Server is ruining on port 3333" })
);
