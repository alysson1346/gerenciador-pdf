import { generatePdf } from "../../services/constructorPdf";
import { Request, Response } from "express";
import { dynamicColumn } from "../../components/dynamicColumns";
import { generateDynamicHTML } from "../../components/generateDynamicHTML";
// import { testee } from "../../components/teste";
interface DynamicColumn {
    title: string; // Título da coluna
    content: string; // Conteúdo da coluna
  }
export const generatePdfHandler = async (req: Request, res: Response) => {
  try {
    // Obter o stream do PDF gerado
    const pdfStream = await generatePdf();

    // Configurar a resposta como PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=plano_de_acao.pdf");

    // Enviar o PDF diretamente ao cliente
    pdfStream.pipe(res);
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    res.status(500).send({ error: "Erro ao gerar o PDF" });
  }
};
