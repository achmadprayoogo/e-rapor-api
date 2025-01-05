export default function errorHandler(err, res, req, next) {
  console.log("Error caught:", err); // untuk debugging

  // Handle express-joi-validation errors
  if (err && err.error && err.error.isJoi) {
    return res.status(409).json({
      status: "error",
      message: err.error.details.map((detail) => detail.message).join(", "),
    });
  }

  // Handle ActionError
  if (err instanceof Error) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }

  // Default error
  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
}
