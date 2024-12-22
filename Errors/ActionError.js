export default class ActionError extends Error {
  statusCode = 422;
  constructor(message) {
    super(message);
    this.name = "ActionError";
  }
}
