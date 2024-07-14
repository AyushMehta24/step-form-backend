import { Request, Response } from "express";
import prisma from "../prisma";
import { Prisma } from "@prisma/client";

const updateBasicDetails = async (req: Request, res: Response) => {
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
    const updatedBasicDetails = await prisma.basicDetails.update({
      where: { email },
      data: {
        fname,
        lname,
        designation,
        address1,
        address2,
        city,
        state,
        password,
        contact,
        gender,
        relationship,
        dob: new Date(dob),
        pincode,
        Education: {
          deleteMany: {},
          create: educationDetails.map((edu: any) => ({
            ...edu,
            year: new Date(edu.year),
          })),
        },
        Language: {
          deleteMany: {},
          create: languageKnown,
        },
        Preferences: {
          deleteMany: {},
          create: preferences,
        },
        References: references
          ? {
              deleteMany: {},
              create: references,
            }
          : undefined,
        TechnologyKnown: {
          deleteMany: {},
          create: technologyKnown,
        },
        WorkExperience: workExperience
          ? {
              deleteMany: {},
              create: workExperience.map((work: any) => ({
                ...work,
                from: new Date(work.from),
                to: new Date(work.to),
              })),
            }
          : undefined,
      },
    });
    res.status(200).json(updatedBasicDetails);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2001") {
        return res
          .status(404)
          .json({ error: "Basic details not found for the provided email" });
      }
    }
    res
      .status(400)
      .json({ error: "Error updating basic details with related data" });
  }
};

export { updateBasicDetails };
