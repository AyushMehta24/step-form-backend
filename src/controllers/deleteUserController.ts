// src/controllers/basicDetailsController.ts
import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../prisma";

const deleteUser = async (req: Request, res: Response) => {
  try {
      const userId= req.params.id;
    await prisma.basicDetails.update({
      where: {
        id: +userId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
    res.status(200).json({ messagae: "User Deleted Successfully " });
  } catch (error) {
    res.status(400).json({summery : "Error In Deleting Data" ,error: "Error In Deleting Data " });
  }
};

export { deleteUser };
