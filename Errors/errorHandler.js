export default function errorHandler(error, req, res, next) {
  const statusCode = error.error ? 422 : error.statusCode || 500;
  const errors = error.error
    ? [error.error]
    : [
        {
          status: statusCode,
          title: error.name || "Internal Server Error",
          detail: error.message,
        },
      ];

  res.status(statusCode).json({
    jsonapi: { version: "1.1" },
    errors,
  });
}
