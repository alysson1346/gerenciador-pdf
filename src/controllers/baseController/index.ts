import { generatePdf } from '../../services/constructorPdf'
import { Request, Response } from 'express'
import wkhtmltopdf from 'wkhtmltopdf'
import { substituiVariaveis } from '../../services/constructorPdf'

export const generatePdfDynamic = async (req: Request, res: Response) => {
  try {
    // Obter o stream do PDF gerado
    const pdfStream = await generatePdf()

    // Configurar a resposta como PDF
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'inline; filename=plano_de_acao.pdf')

    // Enviar o PDF diretamente ao cliente
    pdfStream.pipe(res)
  } catch (error) {
    console.error('Erro ao gerar PDF:', error)
    res.status(500).send({ error: 'Erro ao gerar o PDF' })
  }
}



export const generatePDF = async (req: Request, res: Response) => {
  try {
    const { templateID, data } = req.body as any
    const template = templates[templateID]
    if (template) {
      const templateFinal = await substituiVariaveis(template, data)
      const pdfStream = wkhtmltopdf(templateFinal, {
        pageSize: 'A4',
        orientation: 'Landscape'
      })

      // Configurar a resposta como PDF
      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', 'inline; filename=plano_de_acao.pdf')
      // Enviar o PDF diretamente ao cliente
      pdfStream.pipe(res)
    }
  } catch (error) {
    console.error('Erro ao gerar PDF:', error)
    res.status(500).json({ error: 'Erro ao gerar o PDF' })
  }
}

const templates: { [key: string]: string } = {
  '1': 'teste.html',
  '2': 'teste2.html',
  '3': 'teste3.html'
}
