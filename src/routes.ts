import express from "express";
import { generatePDFExample, generatePdfHandler } from "./controllers/planoAcaoController";

const router = express.Router();
router.use(express.json({ limit: '200mb' }))

router.get("/generate-pdf/5", generatePdfHandler);

router.post("/generate-pdf/example", generatePDFExample);

export default router;
