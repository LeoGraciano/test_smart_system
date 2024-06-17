import express, { Application } from "express";
import chartRoutes from "./routes/chartRoutes";
import { setupSwagger } from "./swagger";
import cors from "cors";
import { corsOptions } from "./cors";

const app: Application = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/charts", chartRoutes);
setupSwagger(app);

export default app;
