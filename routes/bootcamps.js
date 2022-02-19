const express = require("express");
const { getBootCamps, getBootCamp, updateBootCamp, deleteBootCamp, createBootCamp, getBootcampsInRadius, bootcampPhotoUpload } = require("../controller/bootcamps");
const Bootcamp = require("../models/Bootcamp");
const advancedResults = require("../middleware/advancedResults");
const router = express.Router();
const { protect } = require('../middleware/auth'); 

// Include other resource router 
const courseRouter = require("./courses");

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);


router
  .route("/")
  .get(advancedResults(Bootcamp, 'courses'), getBootCamps)
  .post(protect, createBootCamp);

router
  .route("/:id")
  .get(getBootCamp)
  .delete(protect, deleteBootCamp)
  .put(protect, updateBootCamp);

router  
  .route("/radius/:zipcode/:distance")
  .get(getBootcampsInRadius);

router  
  .route("/:id/photo")
  .put(protect, bootcampPhotoUpload);



module.exports = router;






