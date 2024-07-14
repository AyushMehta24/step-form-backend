// // src/controllers/basicDetailsController.ts
// import { Request, Response } from "express";
// import { Prisma } from "@prisma/client";
// import prisma from "../prisma";

// const getAllUsers = async (req: Request, res: Response) => {
//   try {
//     const allData = await prisma.basicDetails.findMany({
//       where: {
//         isDeleted: false,
//       },
//       select: {
//         id: true,
//         fname: true,
//         email: true,
//         contact: true,
//         gender: true,
//       },
//     });
//     res.status(200).json(allData);
//   } catch (error) {
//     res.status(400).json({summery : "Error in Getting Users's Data" ,  error: "Error In Getting Data " });
//   }
// };

// export { getAllUsers };

import { Request, Response } from "express";
import prisma from "../prisma";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const pageNum = parseInt(page as string);
    const pageSizeNum = parseInt(pageSize as string);

    const allData = await prisma.basicDetails.findMany({
      where: {
        isDeleted: false,
      },
      select: {
        id: true,
        fname: true,
        email: true,
        contact: true,
        gender: true,
      },
      skip: (pageNum - 1) * pageSizeNum,
      take: pageSizeNum,
    });

    const totalRecords = await prisma.basicDetails.count({
      where: {
        isDeleted: false,
      },
    });

    res.status(200).json({
      data: allData,
      totalRecords,
      totalPages: Math.ceil(totalRecords / pageSizeNum),
      currentPage: pageNum,
    });
  } catch (error) {
    res.status(400).json({
      summary: "Error in Getting Users' Data",
      error: "Error In Getting Data",
    });
  }
};

export { getAllUsers };
