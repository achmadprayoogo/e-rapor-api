import joi from "joi";
import validator from "express-joi-validation";
import ActionError from "../../Errors/ActionError.js";

export default class StudentRouterValidator {
  static studentSchema = joi.object({
    id: joi.string().length(36),
    nis: joi.alternatives().try(joi.number(), joi.string()).required(),
    fullname: joi.string().required(),
    city_of_birth: joi.string().required(),
    birthdate: joi.date().required(),
    father_name: joi.string().required(),
    mother_name: joi.string().required(),
    guardian_name: joi.string().allow(""),
    status: joi.string().allow(""),
    address: joi.string().required(),
    class_name_id: joi.string().length(36).required(),
  });

  static getValidator() {
    const schema = joi.object({
      page: joi
        .object({
          number: joi.number().min(1).required(),
          size: joi.number().min(1).required(),
        })
        .required(),
    });

    return validator.createValidator({ passError: true }).query(schema);
  }

  static inputValidator() {
    const schema = this.studentSchema;

    return validator.createValidator({ passError: true }).body(schema);
  }

  static importValidator() {
    return (req, res, next) => {
      if (!req.file) {
        const error = new ActionError("No file uploaded");
        error.message = "A CSV file is required for student import";
        throw error;
      }

      // Validate file properties
      const { error } = joi
        .object({
          mimetype: joi
            .string()
            .valid("text/csv", "application/vnd.ms-excel")
            .required(),
          buffer: joi.binary().min(1).required(),
        })
        .validate({
          mimetype: req.file.mimetype,
          buffer: req.file.buffer,
        });

      next();
    };
  }

  static updateValidator() {
    const schema = joi.object({
      students: joi.array().items(this.studentSchema).min(1).required(),
    });

    return validator.createValidator({ passError: true }).body(schema);
  }

  static deleteValidator() {
    const schema = joi.object({
      id: joi.string().length(36).required(),
    });

    return validator.createValidator({ passError: true }).query(schema);
  }
}
