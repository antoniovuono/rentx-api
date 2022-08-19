import { Router } from "express";
import multer from "multer";

import upload from "../../../../config/upload";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListCarsController } from "../../../../modules/cars/useCases/listCars/ListCarsController";
import { UploadCarImageController } from "../../../../modules/cars/useCases/uploadImage/UploadCarImageController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const uploadAvatar = multer(upload);

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImageController();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get("/available", listCarsController.handle);

carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  uploadAvatar.array("images"),
  uploadCarImagesController.handle
);

export { carsRoutes };
