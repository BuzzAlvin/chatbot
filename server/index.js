import express from "express";
import cors from "cors";
import router from "./routes/ChatRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", router);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
