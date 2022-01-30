const Bootcamp = require("../models/Bootcamp");

// @desc      Get all Bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
exports.getBootCamps = async function(req, res, next){
    
    try {
        const bootcamps = await Bootcamp.find();

        res.status(200).json({
            success : true,
            count : bootcamps.length,
            data : bootcamps
        })

    } catch (err) {
        res.status(400).json({
            success : false,
            error : err.msg
        })
    }

} 

// @desc      Get single Bootcamp
// @route     GET /api/v1/bootcamps/:id
// @access    Public
exports.getBootCamp = async function(req, res, next){

    try {
        const bootcamp = await Bootcamp.findById(req.params.id);

        if(!bootcamp){
            return res.status(400).json({success : false})
        }

        res.status(200).json({
            success : true,
            data : bootcamp
        })

    } catch (err) {
        res.status(400).json({
            success : false,
            data : err.msg
        })
    }
    
}

// @desc      Create Bootcamps
// @route     POST /api/v1/bootcamps/
// @access    Private
exports.createBootCamp = async function(req, res, next){

   const bootcamp = await Bootcamp.create(req.body);
   res.status(201).json({
       success : true,
       data : bootcamp
   })
}

// @desc      Update Bootcamp
// @route     PUT /api/v1/bootcamps/:id
// @access    Private
exports.updateBootCamp = async function(req, res, next){
    
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
            runValidators : true
        })

        if(!bootcamp){
            return res.status(400).json({success : false})
        }

        res.status(200).json({
            success : true,
            data : bootcamp
        })

    } catch (err) {
        res.status(400).json({
            success : false,
            data : err.msg
        })
    }
}

// @desc      Delete Bootcamp
// @route     DELETE /api/v1/bootcamps/:id
// @access    Private
exports.deleteBootCamp = async function(req, res, next){
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

        if(!bootcamp){
            return res.status(400).json({success : false})
        }

        res.status(200).json({
            success : true,
            data : bootcamp
        })

    } catch (err) {
        res.status(400).json({
            success : false,
            data : err.msg
        })
    }
}