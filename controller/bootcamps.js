const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Get all Bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
exports.getBootCamps = asyncHandler(async function(req, res, next){

       let query;
       
       const reqQuery = { ...req.query };

       // Fields to exclude =>
       const removeFields = ["select", "sort", "page", "limit"];

       // Loops over removeFields and delete them from reqQuery
       removeFields.forEach(params => delete reqQuery[params]);

       let queryStr = JSON.stringify(reqQuery);

       console.log(queryStr);
       
       // Create operators ($gt, $gte, etc)
       queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
       
       query = Bootcamp.find(JSON.parse(queryStr)).populate("courses");

       if(req.query.select){
           const fields = req.query.select.split(",").join(" ");
           query = query.select(fields);
       }

       // Sort
       if(req.query.sort){
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
       }else{
           query = query.sort("-createdAt"); 
       }

       // Pagination =>
       const page = parseInt(req.query.page, 10) || 1;
       const limit = parseInt(req.query.limit, 10) || 25;
       const startIndex = (page - 1) * limit;
       const endIndex = page * limit;
       const total = await Bootcamp.countDocuments();

       query = query.skip(startIndex).limit(limit);


       const bootcamps = await query;

       // Pagination Result =>
       const pagination = {};

       if(endIndex < total){
           pagination.next = {
               page : page + 1,
               limit
           }
       }

       if(startIndex > 0){
           pagination.prev = {
               page : page - 1,
               limit
           }
       }

        res.status(200).json({
            success : true,
            count : bootcamps.length,
            pagination,
            data : bootcamps,
        })
});

// @desc      Get single Bootcamp
// @route     GET /api/v1/bootcamps/:id
// @access    Public
exports.getBootCamp = asyncHandler(async function(req, res, next){

        const bootcamp = await Bootcamp.findById(req.params.id);

        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
        }

        res.status(200).json({
            success : true,
            data : bootcamp
        })
    
})

// @desc      Create Bootcamps
// @route     POST /api/v1/bootcamps/
// @access    Private
exports.createBootCamp = asyncHandler(async function(req, res, next){
  
        const bootcamp = await Bootcamp.create(req.body);

        res.status(201).json({
            success : true,
            data : bootcamp
        })       
    
})

// @desc      Update Bootcamp
// @route     PUT /api/v1/bootcamps/:id
// @access    Private
exports.updateBootCamp = asyncHandler(async function(req, res, next){
    
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
            runValidators : true
        })

        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
        }

        res.status(200).json({
            success : true,
            data : bootcamp
        })
  
})

// @desc      Delete Bootcamp
// @route     DELETE /api/v1/bootcamps/:id
// @access    Private
exports.deleteBootCamp = asyncHandler(async function(req, res, next){
    
        const bootcamp = await Bootcamp.findById(req.params.id)

        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
        }

        bootcamp.remove();

        res.status(200).json({
            success : true,
            data : bootcamp
        })
})


// @desc      Get boocamps within a radius
// @route     GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access    Private
exports.getBootcampsInRadius = asyncHandler(async function(req, res, next){
   const { zipcode, distance } = req.params;

   // Get lat/lan from geocoder
   const loc = await geocoder.geocode(zipcode);
   const lat = loc[0].latitude;
   const lng = loc[0].longitude;

   // Calc radius using radians
   // Divide distance by radius of earth
   // Earth radius = 3,963 miles
   const radius = distance / 3963;

   const bootcamps = await Bootcamp.find({
       location : { $geoWithin: { $centerSphere: [ [ lng, lat ], radius ] }}
   });
   
   res.status(200).json({
       success : true,
       count : bootcamps.length,
       data : bootcamps
   })

})