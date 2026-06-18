import express from "express";
import Router from "./routes/index.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";
const app = express();

app.use(express.json());
Router(app);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
