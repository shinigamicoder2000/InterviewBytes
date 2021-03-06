const express=require('express');
const router=express.Router();

router.get('/',require('../controllers/home').home);

module.exports=router;
