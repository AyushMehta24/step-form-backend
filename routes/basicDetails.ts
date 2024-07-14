// // src/routes/basicDetails.ts
// import { Router } from "express";
// import { createBasicDetails } from "../src/controllers/basicDetailsController";
// import validateBasicDetails from "../src/middlewares/basicDetailsMiddleware";
// import validateBasicDetailsUpdate from "../src/middlewares/basicDetailsUpdateValidator";
// import { updateBasicDetails } from "../src/controllers/basicDetailsUpdateController";
// import { getAllUsers } from "../src/controllers/getAllUserDetailsController";
// import { deleteUser } from "../src/controllers/deleteUserController";
// import { getUsersData } from "../src/controllers/getUsersData";

// const router = Router();

// router.get("/", getAllUsers);
// router.get("/basic-details-user/:id", getUsersData);

// router.post("/basic-details", validateBasicDetails, createBasicDetails);
// router.put("/basic-details/:id", validateBasicDetailsUpdate, updateBasicDetails);
// router.delete("/deleteUser/:id", deleteUser);

// export default router;

import { Router } from "express";
import { createBasicDetails } from "../src/controllers/basicDetailsController";
import validateBasicDetails from "../src/middlewares/basicDetailsMiddleware";
import validateBasicDetailsUpdate from "../src/middlewares/basicDetailsUpdateValidator";
import { updateBasicDetails } from "../src/controllers/basicDetailsUpdateController";
import { getAllUsers } from "../src/controllers/getAllUserDetailsController";
import { deleteUser } from "../src/controllers/deleteUserController";
import { getUsersData } from "../src/controllers/getUsersData";

const router = Router();

router.get("/", getAllUsers);
router.get("/basic-details-user/:id", getUsersData);

router.post("/basic-details", validateBasicDetails, createBasicDetails);
router.put(
  "/basic-details/:id",
  validateBasicDetailsUpdate,
  updateBasicDetails
);
router.delete("/deleteUser/:id", deleteUser);

export default router;
