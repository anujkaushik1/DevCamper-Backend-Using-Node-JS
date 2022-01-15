// @desc      Get all Bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
exports.getBootCamps = function(req, res, next){
    res.status(200).json({ success : true, msg : "Show all Bootcamps", middlewareData : req.anuj })
} 

// @desc      Get single Bootcamp
// @route     GET /api/v1/bootcamps/:id
// @access    Public
exports.getBootCamp = function(req, res, next){
    res.status(200).json({ success : true, msg : `Get bootcamp ${req.params.id}` })
}

// @desc      Create Bootcamps
// @route     POST /api/v1/bootcamps/
// @access    Private
exports.createBootCamp = function(req, res, next){
    res.status(200).json({success : true, msg : "Create new bootcamp"})
}

// @desc      Update Bootcamp
// @route     PUT /api/v1/bootcamps/:id
// @access    Private
exports.updateBootCamp = function(req, res, next){
    res.status(200).json({ success : true, msg : `Update bootcamp ${req.params.id}` })
}

// @desc      Delete Bootcamp
// @route     DELETE /api/v1/bootcamps/:id
// @access    Private
exports.deleteBootCamp = function(req, res, next){
    res.status(200).json({ success : true, msg : `Delete bootcamp ${req.params.id}` })
}