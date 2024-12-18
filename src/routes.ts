import express from "express";
import { generatePdfHandler } from "./controllers/planoAcaoController";

const router = express.Router();

router.get("/generate-pdf/5", generatePdfHandler);

export default router;
