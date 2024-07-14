// src/middleware/basicDetailsValidator.ts
import { Request, Response, NextFunction } from "express";
import Joi, { ValidationErrorItem } from "joi";

const basicDetailsSchema = Joi.object({
  basicDetails: Joi.object({
    fname: Joi.string().required().messages({
      "any.required": "First name is required",
      "string.empty": "First name cannot be empty",
    }),
    lname: Joi.string().required().messages({
      "any.required": "Last name is required",
      "string.empty": "Last name cannot be empty",
    }),
    designation: Joi.string().required().messages({
      "any.required": "Designation is required",
      "string.empty": "Designation cannot be empty",
    }),
    address1: Joi.string().required().messages({
      "any.required": "Address Line 1 is required",
      "string.empty": "Address Line 1 cannot be empty",
    }),
    address2: Joi.string().required().messages({
      "any.required": "Address Line 2 is required",
      "string.empty": "Address Line 2 cannot be empty",
    }),
    city: Joi.string().required().messages({
      "any.required": "City is required",
      "string.empty": "City cannot be empty",
    }),
    state: Joi.string().required().messages({
      "any.required": "State is required",
      "string.empty": "State cannot be empty",
    }),
    email: Joi.string().email().required().messages({
      "any.required": "Email is required",
      "string.empty": "Email cannot be empty",
      "string.email": "Email must be a valid email",
    }),
    password: Joi.string().min(6).required().messages({
      "any.required": "Password is required",
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least {#limit} characters",
    }),
    contact: Joi.string().required().messages({
      "any.required": "Contact number is required",
      "string.empty": "Contact number cannot be empty",
    }),
    gender: Joi.string().required().messages({
      "any.required": "Gender is required",
      "string.empty": "Gender cannot be empty",
    }),
    relationship: Joi.string().required().messages({
      "any.required": "Relationship status is required",
      "string.empty": "Relationship status cannot be empty",
    }),
    dob: Joi.date().iso().required().messages({
      "any.required": "Date of Birth is required",
      "date.format": "Date of Birth must be in ISO 8601 format",
    }),
    pincode: Joi.string().required().messages({
      "any.required": "Pincode is required",
      "string.empty": "Pincode cannot be empty",
    }),
  }).required(),

  educationDetails: Joi.array()
    .items(
      Joi.object({
        courseName: Joi.string().required().messages({
          "any.required": "Course Name is required",
          "string.empty": "Course Name cannot be empty",
        }),
        school: Joi.string().required().messages({
          "any.required": "School is required",
          "string.empty": "School cannot be empty",
        }),
        year: Joi.date().iso().required().messages({
          "any.required": "Year is required",
          "date.format": "Year must be in ISO 8601 format",
        }),
        percentage: Joi.string().required().messages({
          "any.required": "Percentage is required",
          "string.empty": "Percentage cannot be empty",
        }),
      })
    )
    .required()
    .messages({
      "any.required": "Education details are required",
      "array.empty": "Education details cannot be empty",
    }),
  languageKnown: Joi.array()
    .items(
      Joi.object({
        languageName: Joi.string().required(),
        languageRead: Joi.boolean(),
        languageWrite: Joi.boolean(),
        languageSpeak: Joi.boolean(),
      })
        .or("languageRead", "languageWrite", "languageSpeak")
        .required()
    )
    .required()
    .messages({
      "any.required":
        "At least one of Language skills (Read, Write, Speak) is required",
      "array.empty": "Language skills cannot be empty",
    }),
  preferences: Joi.array()
    .min(1)
    .items(
      Joi.object({
        location: Joi.string().required(),
        noticePeriod: Joi.number().integer().required(),
        expectedCtc: Joi.string().required(),
        currentCtc: Joi.string().required(),
        department: Joi.string().required(),
      })
    )
    .required()
    .messages({
      "any.required": "Preferences are required",
      "array.min": "At least one preference is required",
      "array.empty": "Preferences cannot be empty",
    }),
  references: Joi.array()
    .items(
      Joi.object({
        refName: Joi.string().required(),
        refContact: Joi.string().required(),
        refRelation: Joi.string().required(),
      })
    )
    .optional()
    .messages({
      "array.empty": "References must be an array",
    }),
  technologyKnown: Joi.array()
    .items(
      Joi.object({
        technologyName: Joi.string().required(),
        skillLevel: Joi.string().required(),
      })
    )
    .required()
    .messages({
      "any.required":
        "At least one of Technology skills (Read, Write, Speak) is required",
      "array.empty": "Technology skills cannot be empty",
    }),
  workExperience: Joi.array()
    .items(
      Joi.object({
        companyName: Joi.string().required(),
        designation: Joi.string().required(),
        from: Joi.date().iso().required(),
        to: Joi.date().iso().required(),
      })
    )
    .optional()
    .messages({
      "array.empty": "Work experience must be an array",
    }),
}).options({ abortEarly: false });

const validateBasicDetails = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.educationDetails && Array.isArray(req.body.educationDetails)) {
    req.body.educationDetails = req.body.educationDetails.filter(
      (item: any) => {
        return (
          item.courseName !== undefined ||
          item.school !== undefined ||
          item.year !== undefined ||
          item.percentage !== undefined
        );
      }
    );

    if (req.body.educationDetails.length === 0) {
      return res.status(400).json({
        summery: "You missed to fill some fields",
        errors: ["Education Details cannot be empty"],
      });
    }
  }

  // Filter out objects from languageKnown array where all skills are falsy
  if (req.body.languageKnown && Array.isArray(req.body.languageKnown)) {
    req.body.languageKnown = req.body.languageKnown.filter((item: any) => {
      return (
        item.languageName !== undefined ||
        item.languageRead !== undefined ||
        item.languageWrite !== undefined ||
        item.languageSpeak !== undefined
      );
    });
  }

  // Ensure technologyKnown array is not empty and contains valid objects
  // if (req.body.technologyKnown && Array.isArray(req.body.technologyKnown)) {
  //   req.body.technologyKnown = req.body.technologyKnown.filter((item: any) => {
  //     return (
  //       item.technologyName !== undefined ||
  //       item.technologyRead !== undefined ||
  //       item.technologyWrite !== undefined ||
  //       item.technologySpeak !== undefined
  //     );
  //   });
  // }

  // Filter out empty preferences objects and ensure at least one preference exists
  if (req.body.preferences && Array.isArray(req.body.preferences)) {
    req.body.preferences = req.body.preferences.filter((item: any) => {
      return (
        item.location !== undefined &&
        item.noticePeriod !== undefined &&
        item.expectedCtc !== undefined &&
        item.currentCtc !== undefined &&
        item.department !== undefined
      );
    });

    if (req.body.preferences.length === 0) {
      return res.status(400).json({
        summery: "You missed to fill some fields",
        errors: ["Preferences cannot be empty"],
      });
    }
  }

  const { error } = basicDetailsSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errorMessages: string[] = error.details.map(
      (detail: ValidationErrorItem) => {
        if (detail.message) {
          return detail.message.replace(/['"]/g, ""); // Remove quotes from error messages
        }
        return "";
      }
    );
    return res.status(400).json({
      summery: "You missed to fill some fields",
      errors: errorMessages,
    });
  }

  next();
};

export default validateBasicDetails;
