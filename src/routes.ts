import express from "express";
import { generatePDFExample, generatePdfDynamic } from "./controllers/planoAcaoController";

const router = express.Router();
router.use(express.json({ limit: '200mb' }))

router.get("/generate-pdf/5", generatePdfDynamic);

router.post("/generate-pdf/example", generatePDFExample);

export default router;
