// src/controllers/basicDetailsController.ts
import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../prisma";

const getUsersData = async (req: Request, res: Response) => {
  try {
    const userId = +req.params.id;
    if (Number.isNaN(userId))
      return res
        .status(400)
        .json({ summery: "No User Found", errors: "No User Found" });

    const isValid = await validUser(+userId);
    if (!isValid) return res.status(200).json("No User Found");

    const allData = await prisma.basicDetails.findMany({
      where: {
        isDeleted: false,
        id: +userId,
      },
      select: {
        fname: true,
        email: true,
        contact: true,
        gender: true,
        address1: true,
        address2: true,
        city: true,
        dob: true,
        lname: true,
        pincode: true,
        password: true,
        state: true,
        relationship: true,
        designation: true,
        Education: {
          select: {
            courseName: true,
            school: true,
            percentage: true,
            year: true,
          },
        },
        WorkExperience: {
          select: {
            companyName: true,
            designation: true,
            from: true,
            to: true,
          },
        },
        Language: {
          select: {
            languageName: true,
            languageRead: true,
            languageSpeak: true,
            languageWrite: true,
          },
        },
        TechnologyKnown: {
          select: {
            technologyName: true,
            skillLevel: true,
          },
        },
        References: {
          select: {
            refName: true,
            refContact: true,
            refRelation: true,
          },
        },
        Preferences: {
          select: {
            currentCtc: true,
            expectedCtc: true,
            department: true,
            location: true,
            noticePeriod: true,
          },
        },
      },
    });

    const allLocation = await prisma.preferences.groupBy({
      where: {
        isDeleted: false,
        basicDetailsId: userId,
      },
      by: "location",
    });

    const allLocations: string[] = [];
    allLocation.map((loc: { location: string }) => {
      return allLocations.push(loc.location);
    });

    const updatedExperience: {
      designation: string;
      companyName: string;
      from: string;
      to: string;
    }[] = [];
    allData[0].WorkExperience.map(
      (work: {
        designation: string;
        companyName: string;
        from: Date;
        to: Date;
      }) => {
        const tempWork = {
          ...work,
          from: work.from.toISOString().split("T")[0],
          to: work.to.toISOString().split("T")[0],
        };
        updatedExperience.push(tempWork);
      }
    );

    const fdata = {
      basicInfo: {
        fname: allData[0].fname,
        email: allData[0].email,
        contact: allData[0].contact,
        gender: allData[0].gender,
        address1: allData[0].address1,
        address2: allData[0].address2,
        city: allData[0].city,
        dob: allData[0].dob.toISOString().split("T")[0],
        lname: allData[0].lname,
        pincode: allData[0].pincode,
        password: allData[0].password,
        state: allData[0].state,
        relationship: allData[0].relationship,
        designation: allData[0].designation,
      },

      ssc: {
        ...allData[0].Education[0],
        year: allData[0].Education[0].year.getFullYear(),
      },
      hsc: {
        ...allData[0].Education[1],
        year: allData[0].Education[1].year.getFullYear(),
      },
      bachelor: allData[0].Education[2] && {
        ...allData[0].Education[2],
        year: allData[0].Education[2].year.getFullYear(),
      },
      master: allData[0].Education[3] && {
        ...allData[0].Education[3],
        year: allData[0].Education[3].year.getFullYear(),
      },
      workExperience: updatedExperience,

      languages: allData[0].Language,
      technology: allData[0].TechnologyKnown,
      reference: allData[0].References,
      preference: {
        currentCtc: allData[0].Preferences[0].currentCtc,
        expectedCtc: allData[0].Preferences[0].expectedCtc,
        department: allData[0].Preferences[0].department,
        noticePeriod: allData[0].Preferences[0].noticePeriod,
        location: allLocations,
      },
    };
    res.status(200).json({
      data: fdata,
      message: "User data fetched",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      summery: "Error in getting user's data",
      error: "Error In Getting User's Data ",
    });
  }
};

const validUser = async (id: number) => {
  try {
    const allData = await prisma.basicDetails.findUnique({
      where: {
        isDeleted: false,
        id: +id,
      },
      select: {
        id: true,
      },
    });
    return allData?.id ? true : false;
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export { getUsersData };
