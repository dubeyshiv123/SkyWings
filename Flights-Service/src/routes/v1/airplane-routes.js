const express = require("express");

const { AirplaneController } = require("../../controllers");
const { AirplaneMiddlewares } = require("../../middlewares");

const router = express.Router();

// /api/v1/airplanes POST
router.post(
  "/",
  AirplaneMiddlewares.validateCreateRequest,
  AirplaneController.createAirplane
); // So whenever you come to this request, you will first validate this request using the middleware `AirplaneMiddlewares.validateCreateRequest` and then u will create the request using the `AirplaneController.createAirplane` controller.

// /api/v1/airplanes GET
router.get("/", AirplaneController.getAirplanes);

// /api/v1/airplanes/:id GET
router.get("/:id", AirplaneController.getAirplane);

// /api/v1/airplanes/:id DELETE
router.delete("/:id", AirplaneController.destroyAirplane);

/*
Here we don't have to validate this :id. But in MongoDB, we 
have to validate the id that we are passing as MongoDB does 
not provide incremental ids like 1,2,3,4,5... It gives u a 
hashed ID. So we have to put middleware in b/w to check if 
it is a valid Mongo ID or not, as someone can pass just a 
random :id 
*/

// /api/v1/airplanes/:id PATCH
router.patch("/:id", AirplaneController.updateAirplane);

module.exports = router;
