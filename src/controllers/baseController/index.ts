import { generatePdf } from '../../services/constructorPdf'
import { Request, Response } from 'express'
import wkhtmltopdf from 'wkhtmltopdf'
import { substituiVariaveis } from '../../services/constructorPdf'
import { AppDataSource } from '../../data-source'
import { Layout } from '../../entities/layout.entities'

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
    const {idlayout} = req.params
    const repository = AppDataSource.getRepository(Layout);
    const { data } = req.body as any
    const template = await repository.findOneBy({
      idlayout: idlayout,
    });
    console.log('template')
    console.log(template)
    if (template?.idlayout) {
      const templateFinal = await substituiVariaveis(template.layout_html, data)
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
