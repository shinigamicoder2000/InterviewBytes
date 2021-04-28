const express = require("express");
const router = express.Router();

router.get("/", require("../controllers/home").home);
router.use("/experiences", require("./interviewExperience"));
module.exports = router;
