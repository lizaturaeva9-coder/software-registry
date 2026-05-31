const express = require("express");
const router = express.Router();
const softwareController = require("../controllers/software.controller");

router.get("/", softwareController.getAll);
router.get("/:id", softwareController.getById); 
router.post("/", softwareController.create);
router.put("/:name", softwareController.update);   // НОВИЙ МАРШРУТ ДЛЯ РЕДАГУВАННЯ
router.delete("/:name", softwareController.remove); 

module.exports = router;