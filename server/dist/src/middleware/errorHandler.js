"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
var ErrorHandler = function (err, req, res, next) {
    var errStatus = err.statusCode || 400;
    var errMsg = err.message || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
};
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=errorHandler.js.map