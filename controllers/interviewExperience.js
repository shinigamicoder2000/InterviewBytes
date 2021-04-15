const Experience = require("../models/experience");
const ExpressError = require("../util/ExpressError");
module.exports.getAllExperiences = async (req, res) => {
  const experiences = await Experience.find({});
  res.render("experiences/index", { title: "All", experiences: experiences });
};

module.exports.getExperience = async (req, res) => {
  console.log(req.params.id);
  const experience = await Experience.findById(req.params.id);
  res.render("experiences/show", {
    title: "experience",
    experience: experience,
  });
};

module.exports.getCreateExperience = (req, res) => {
  res.render("experiences/new", { title: " Add experience" });
};
module.exports.postCreateExperience = async (req, res) => {
  
  console.log(req.body.username);
  //    if(!req.body.experience)
  //    {
  //        throw new ExpressError(500,"Invalid form data");
  //    }
  const experience = new Experience(req.body.Experience);
  console.log(req.file);
   experience.resume={url:req.file.path,filename:req.file.filename};
  await experience.save();

  res.redirect(`/experiences/${experience._id}`);
};

module.exports.getEditExperience = async (req, res) => {
  const experience = await Experience.findById(req.params.id);
  res.render("experiences/edit", {
    title: "experience",
    experience: experience,
  });
};

module.exports.postEditExperience = async (req, res) => {
  const id = req.params.id;
  await Experience.findByIdAndUpdate(id, { ...req.body.Experience });

  console.log(req.body.Experience);
  res.redirect(`/experiences/${id}`);
};
module.exports.deleteExperience = async (req, res) => {
  const id = req.params.id;
  await Experience.findByIdAndDelete(id);

  res.redirect(`/experiences`);
};
