// src/index.ts
import express from "express";
import router from "../routes/basicDetails";
import cors from "cors";

const app = express();
app.use(cors({origin : "*" , credentials:true}));

app.use(express.json());


app.use("/", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
