export default class NotFoundError extends Error {
  statusCode = 404;
  constructor(message) {
    super(message);
    this.name = "Not Found Error";
  }
}
