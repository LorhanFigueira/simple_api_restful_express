import express, { type Application } from "express";
const healthRouter: Application = express();

healthRouter.get("/health", (req, res) => {
  res.status(200).json({ message: "Ok" });
});

export default healthRouter;
