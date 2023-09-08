const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateBookingRequest(req, res, next) {
  if (!req.body.flightId) {
    ErrorResponse.message = "Failed to book the Flight";
    ErrorResponse.error = new AppError(
      ["The Flight ID was not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.noOfSeats) {
    ErrorResponse.message = "Failed to book the Flight";
    ErrorResponse.error = new AppError(
      ["Number of Seats were not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateBookingRequest,
};
