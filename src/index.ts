import express from "express";
import "reflect-metadata";
import bodyParser from "body-parser";
import cors from "cors";
import contactRoutes from "./routes/example";

const app = express();
const port = process.env.PORT || 3000;

// middlewares

app.use(bodyParser.json());

app.use(cors());

//routes
app.use("/v1", contactRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
