export default class DatabaseError extends Error {
  constructor(message) {
    let errorMessage = message;
    let statusCode = 500;

    if (typeof message === "object" && message.code) {
      switch (message.code) {
        case "P1000":
          errorMessage =
            "Database authentication failed. Please ensure database credentials are valid.";
          statusCode = 500;
          break;
        case "P1001":
          errorMessage =
            "Unable to connect to database. Please ensure database server is running.";
          statusCode = 500;
          break;
        case "P1002":
          errorMessage = "Database server timeout. Please try again.";
          statusCode = 504;
          break;
        case "P2000":
          errorMessage = `Data too long for column: ${
            message.meta?.target || "unknown"
          }`;
          statusCode = 400;
          break;
        case "P2002":
          errorMessage = `Duplicate entry found for: ${
            message.meta?.target?.join(", ") || "unknown"
          }`;
          statusCode = 409;
          break;
        case "P2003":
          errorMessage = `Foreign key validation failed on: ${
            message.meta?.field_name || "unknown"
          }`;
          statusCode = 400;
          break;
        case "P2005":
          errorMessage = "Invalid data for specified field type";
          statusCode = 400;
          break;
        case "P2006":
          errorMessage = "The provided data is invalid";
          statusCode = 400;
          break;
        case "P2011":
          errorMessage = "Null value found in required field";
          statusCode = 400;
          break;
        case "P2012":
          errorMessage = "Required data not found";
          statusCode = 400;
          break;
        case "P2014":
          errorMessage = "Required relation not satisfied";
          statusCode = 400;
          break;
        case "P2025":
          errorMessage = "Required record not found in database";
          statusCode = 404;
          break;
        default:
          errorMessage = message.message || "A database error occurred";
          statusCode = 500;
          break;
      }
    }

    super(errorMessage);
    this.name = "DatabaseError";
    this.statusCode = statusCode;
  }
}
