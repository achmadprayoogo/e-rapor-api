import NotFoundError from "../Errors/notFoundError.js";

export default class JsonApi {
  static version = 1.1;

  static getVersion() {
    return {
      version: this.version,
    };
  }

  static remakeResponseData(type, data) {
    if (data === null) {
      throw new NotFoundError(`Data ${type} not found`);
    } else if (Array.isArray(data)) {
      const remakedData = [];

      for (let result of data) {
        result = {
          type,
          id: result.id,
          attributes: {
            ...result,
            id: undefined,
          },
        };

        remakedData.push(result);
      }
      return {
        jsonapi: this.getVersion(),
        data: remakedData,
      };
    }

    return {
      jsonapi: this.getVersion(),
      data: {
        id: data.id,
        attributes: {
          ...data,
          id: undefined,
        },
      },
    };
  }
}
