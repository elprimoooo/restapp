const express = require("express");
const router = express.Router();
const catController = require("../controllers/cat");

router.get("/", catController.getCats);
router.get("/:id", catController.getCat);
router.post("/", catController.postCat);
router.put("/:id", catController.putCat);
router.patch("/:id", catController.patchCat);
router.delete("/:id", catController.deleteCat);

module.exports = router;