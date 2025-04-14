
const { constants } = require("../constants");


const errorHandler = (err, req, res, next) => {
    const statuscode = res.statuscode ? res.statuscode : 500;

    switch (statuscode) {
        case constants.NOT_FOUND:
            res.status(404);
            res.json({
                message: err.message,
                status: 404,
                stackTree: err.stack,
                title: "Not Found"
            });
            break;

        case constants.INTERNAL_SERVER_ERROR:
            res.status(500);
            // case constants.INTERNAL_SERVER_ERROR:
            res.status(500);
            res.json({
                    message: err.message,
                    stackTree: err.stack,
                    title: "internal server Error"
            });

            break;
        case constants.BAD_REQUEST:
            res.status(400);
            res.json({
                message: err.message,
                stackTree: err.stack,
                title: "Bad Request"
            });
            break;
        case constants.UNAUTHORIZED:
            res.status(401);
            res.json({
                message: err.message,
                stackTree: err.stack,
                title: "Unauthorized"
            });
            break;
        case constants.FORBIDDEN:
            res.status(403);
            res.json({
                message: err.message,
                stackTree: err.stack,
                title: "Forbidden"
            });
            break;
        case constants.VALIDATION_ERROR:
            res.status(422);
            res.json({
                message: err.message,
                stackTree: err.stack,
                title: "Validation Error"
            });
            break;
        default:
            console.log("no error everything is fine");
            break;
    }
};



module.exports = { errorHandler };

