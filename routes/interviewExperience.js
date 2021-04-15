const express = require("express");
const router = express.Router();
const catchAsync = require("../util/catchAsync");
const ExpressError = require("../util/ExpressError");
const interviewExperienceController = require("../controllers/interviewExperience");
const { experienceSchema } = require("../schemas.js");
const validateExperience = (req, res, next) => {
  const { error } = experienceSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",,,");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};
const multer  = require('multer')
const {storage}=require('../cloudinary');
const upload = multer({ storage })
router.get("/", catchAsync(interviewExperienceController.getAllExperiences));
router.get("/create", interviewExperienceController.getCreateExperience);
router.post(
  "/create",
  upload.single('resume'),
  validateExperience,
  
  catchAsync(interviewExperienceController.postCreateExperience)
  
);
router.get("/:id", catchAsync(interviewExperienceController.getExperience));
router.get(
  "/:id/edit",
  catchAsync(interviewExperienceController.getEditExperience)
);
router.put(
  "/:id",
  validateExperience,
  catchAsync(interviewExperienceController.postEditExperience)
);
router.delete(
  "/:id",
  catchAsync(interviewExperienceController.deleteExperience)
);
// router.patch('/:id',interviewExperienceController.editExperience);
// router.delete('/:id',interviewExperienceController.deleteExperience);

module.exports = router;
