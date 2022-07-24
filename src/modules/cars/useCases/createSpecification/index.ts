import { SpecificationsReposiroty } from "../../repositories/implementations/SpecificationsReposiroty";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const specificationsReposiroty = new SpecificationsReposiroty();

const createSpecificationsUseCase = new CreateSpecificationUseCase(
  specificationsReposiroty
);

const createSpecificationsController = new CreateSpecificationController(
  createSpecificationsUseCase
);

export { createSpecificationsController };
