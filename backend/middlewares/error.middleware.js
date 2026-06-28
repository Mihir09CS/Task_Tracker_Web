const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)[0]?.message || message;
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource ID";
  } else if (err.code === 11000) {
    statusCode = 409;
    message = "Duplicate key error";
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;
