const express=require('express');
const router=express.Router();
const catchAsync=require('../util/catchAsync');
const interviewExperienceController=require('../controllers/interviewExperience');

router.get('/',catchAsync(interviewExperienceController.getAllExperiences));
router.get('/create',interviewExperienceController.getCreateExperience);
router.post('/create',catchAsync(interviewExperienceController.postCreateExperience));
router.get('/:id',catchAsync(interviewExperienceController.getExperience));
router.get('/:id/edit',catchAsync(interviewExperienceController.getEditExperience));
router.put('/:id',catchAsync(interviewExperienceController.postEditExperience));
router.delete('/:id',catchAsync(interviewExperienceController.deleteExperience));
// router.patch('/:id',interviewExperienceController.editExperience);
// router.delete('/:id',interviewExperienceController.deleteExperience);

module.exports=router;
