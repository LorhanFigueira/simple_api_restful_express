import express from "express";
import Router from "./routes/index.js";
const app = express();

app.use(express.json());
Router(app);

export default app;
