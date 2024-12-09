export default class ActionError extends Error {
  data = {};
  constructor(message) {
    super(message);
    this.name = "ActionError";
  }
}
