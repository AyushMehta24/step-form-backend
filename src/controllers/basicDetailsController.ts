// src/controllers/basicDetailsController.ts
import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../prisma";

const createBasicDetails = async (req: Request, res: Response) => {
  console.log(".........");
  const {
    basicDetails,
    educationDetails,
    languageKnown,
    preferences,
    references,
    technologyKnown,
    workExperience,
  } = req.body;

  const {
    fname,
    lname,
    designation,
    address1,
    address2,
    city,
    state,
    email,
    password,
    contact,
    gender,
    relationship,
    dob,
    pincode,
  } = basicDetails;

  try {
    const newBasicDetails = await prisma.basicDetails.create({
      data: {
        fname,
        lname,
        designation,
        address1,
        address2,
        city,
        state,
        email,
        password,
        contact,
        gender,
        relationship,
        dob: new Date(dob),
        pincode,
        Education: {
          create: educationDetails.map((edu: any) => ({
            ...edu,
            year: new Date(edu.year),
          })),
        },
        Language: {
          create: languageKnown,
        },
        Preferences: {
          create: preferences,
        },
        References: references
          ? {
              create: references,
            }
          : undefined,
        TechnologyKnown: {
          create: technologyKnown,
        },
        WorkExperience: workExperience
          ? {
              create: workExperience.map((work: any) => ({
                ...work,
                from: new Date(work.from),
                to: new Date(work.to),
              })),
            }
          : undefined,
      },
    });
    res.status(201).json(newBasicDetails);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (
        error.code === "P2002" &&
        error.meta?.target === "BasicDetails_email_key"
      ) {
        return res.status(400).json({ error: "Email is already taken" });
      }
    }
    res
      .status(400)
      .json({ error: "Error creating basic details with related data" });
  }
};

export { createBasicDetails };
