function defaultResponse(req,res) {
    return res.status(req.body.sc).json({
        success: req.body.success,
        method: req.method,
        path: req.url,
        response: req.body.data
    })
}
/* function mustBeTheOwner(req, res) {
    return res.status(401).json({
        success: false,
        message: "You must be the owner to carry out this operation",
    });
}

function activityNotFound(req, res) {
    return res.status(404).json({
        success: false,
        message: "Couldn't find the activity",
    });
} */

export default defaultResponse