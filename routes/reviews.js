const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/Review");
const advancedResults = require("../middleware/advancedResults");
const {
  getReviews
} = require("../controller/reviews");
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(
    advancedResults(Review, {
      path: "bootcamp",
      select: "name description",
    }),
    getReviews
  );

module.exports = router;
