import express from "express";
import { handleCreate, handleGetFormatted,handleGetYearlyBreakdown} from "../controllers/breakdown.controller.js";

const BreakdownRouter = express.Router();

BreakdownRouter.post("/", handleCreate);
BreakdownRouter.get("/", handleGetFormatted);

BreakdownRouter.get("/yearly", handleGetYearlyBreakdown);

export default BreakdownRouter;
