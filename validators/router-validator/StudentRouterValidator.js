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
    status: joi.valid("active", "graduate", "dropout").required(),
    academic_year_id: joi.string().length(36).required(),
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
      sort: joi
        .object({
          by: joi.string().valid("nis", "fullname", "birthdate", "status"),
          order: joi.string().valid("asc", "desc"),
        })
        .required(),
      search: joi.string().allow(""),
      filter: joi.object({
        academic_year_id: joi.string().length(36).allow(""),
      }),
    });

    return validator.createValidator({ passError: true }).query(schema);
  }

  static getByIdValidator() {
    const schema = joi.object({
      id: joi.string().length(36).required(),
    });

    return validator.createValidator({ passError: true }).params(schema);
  }

  static inputValidator() {
    const schema = this.studentSchema;

    return validator.createValidator({ passError: true }).body(schema);
  }

  static importValidator() {
    return (req, res, next) => {
      try {
        if (!req.file) {
          const error = new ActionError(
            "A CSV file is required for student import"
          );
          return next(error);
        }

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

        if (error) {
          return next(
            new ActionError(
              error.details.map((detail) => detail.message).join(", ")
            )
          );
        }

        next();
      } catch (error) {
        next(error);
      }
    };
  }

  static updateValidator() {
    const schema = joi.object({
      id: joi.string().length(36).required(),
      nis: joi.alternatives().try(joi.number(), joi.string()),
      fullname: joi.string(),
      city_of_birth: joi.string(),
      birthdate: joi.date(),
      father_name: joi.string(),
      mother_name: joi.string(),
      guardian_name: joi.string().allow(null),
      address: joi.string(),
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
