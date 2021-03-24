const Experience=require('../models/experience');
module.exports.getAllExperiences=async (req,res)=>{
    const experiences=await Experience.find({});
    res.render('experiences/index',{title:"All",experiences:experiences});
}

module.exports.getExperience=async (req,res)=>{
   const experience=await Experience.findById(req.params.id);
    res.render('experiences/show',{title:"experience",experience:experience});
}

module.exports.getCreateExperience=(req,res)=>{
   
     res.render('experiences/new',{title:" Add experience"});
 }
 module.exports.postCreateExperience=async (req,res)=>{
   console.log(req.body.username);
    const experience=new Experience(req.body.Experience);
    await experience.save();  

    res.redirect(`/experiences/${experience._id}`);
  
}


