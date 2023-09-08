const express = require("express");
const router = express.Router();
const { InfoController, EmailController } = require("../../controllers");

/*
router.get("/info", (req, res) => {
  // Link : http://localhost:3000/api/v1/info
  return res.json({ ms: "OK" });
});
*/
// Replace the above code using this current clean code

router.get("/info", InfoController.info);

router.post("/tickets", EmailController.create);

module.exports = router;
