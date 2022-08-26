import request from "supertest";

import { app } from "../../../../../shared/infra/http/app";

describe("Create Category Controller", () => {
  it("Should be able to create a new Category", async () => {
    const response = await request(app).post("/cateogires").send({
      name: "Category Name Example",
      description: "Description example",
    });

    expect(response.status).toBe(201);
  });
});
