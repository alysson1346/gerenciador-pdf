import express from 'express'
import {
  generatePDF,
  generatePdfDynamic
} from './controllers/baseController'

const router = express.Router()
router.use(express.json({ limit: '200mb' }))

router.get('/generate-pdf/5', generatePdfDynamic)

router.post('/generate-pdf/example', generatePDF)

export default router
