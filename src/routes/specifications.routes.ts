import { Router } from "express";

import { SpecificationsReposiroty } from "../modules/cars/repositories/SpecificationsReposiroty";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationsRoutes = Router();
const specificationsReposiroty = new SpecificationsReposiroty();

specificationsRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const createSpecificationsService = new CreateSpecificationService(
    specificationsReposiroty
  );

  createSpecificationsService.execute({ name, description });

  return response
    .status(201)
    .json({ message: "Specification created successfully" });
});

export { specificationsRoutes };
