export default function errorHandler(error, req, res, next) {
  const requestInfo = {
    method: req.method,
    body: req.body,
    url: req.url,
    ip: req.ip,
    baseUrl: req.baseUrl,
    headers: req.headers,
  };

  console.log("Request Info: ", requestInfo);
  console.error("error handler: ", error);

  const statusCode = error.error ? 422 : statusCode || 500;
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
