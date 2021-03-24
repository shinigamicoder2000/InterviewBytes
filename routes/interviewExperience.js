const express=require('express');
const router=express.Router();

const interviewExperienceController=require('../controllers/interviewExperience');

router.get('/',interviewExperienceController.getAllExperiences);
router.get('/create',interviewExperienceController.getCreateExperience);
router.post('/create',interviewExperienceController.postCreateExperience);
router.get('/:id',interviewExperienceController.getExperience);
router.get('/:id/edit',interviewExperienceController.getEditExperience);
router.put('/:id',interviewExperienceController.postEditExperience);
router.delete('/:id',interviewExperienceController.deleteExperience);
// router.patch('/:id',interviewExperienceController.editExperience);
// router.delete('/:id',interviewExperienceController.deleteExperience);

module.exports=router;
