const express = require("express");
const { getBootCamps, getBootCamp, updateBootCamp, deleteBootCamp, createBootCamp, getBootcampsInRadius, bootcampPhotoUpload } = require("../controller/bootcamps");
const Bootcamp = require("../models/Bootcamp");
const advancedResults = require("../middleware/advancedResults");
const router = express.Router();

// Include other resource router 
const courseRouter = require("./courses");

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);


router
  .route("/")
  .get(advancedResults(Bootcamp, 'courses'), getBootCamps)
  .post(createBootCamp);

router
  .route("/:id")
  .get(getBootCamp)
  .delete(deleteBootCamp)
  .put(updateBootCamp);

router  
  .route("/radius/:zipcode/:distance")
  .get(getBootcampsInRadius);

router  
  .route("/:id/photo")
  .put(bootcampPhotoUpload);



module.exports = router;






