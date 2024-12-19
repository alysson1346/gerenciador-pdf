import { generatePdf } from "../../services/constructorPdf";
import { Request, Response } from "express";
import { dynamicColumn } from "../../components/dynamicColumns";
import { generateDynamicHTML } from "../../components/generateDynamicHTML";
import path, { resolve } from "path";
import fs from 'fs';
import wkhtmltopdf from "wkhtmltopdf";
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

function getFieldValue(dados: any, field: string) {
  console.log("get field value")
  console.log(field)
  const path = field.split('.', 1)
  let fieldValue = ''
  if (field.split('.').length > 1) {
    path.map((value, index) => {
      fieldValue = getFieldValue(
        dados[value] || {},
        field.replace(value + '.', '')
      )
    })
  } else {
    if (dados) {
      fieldValue = dados[field] || ('' as string)
    }
  }
  return fieldValue
}

const substituiVariaveis = (templateName: string, data: any) => {
  return new Promise<string>((resolve, reject) => {
  const templatePath = path.resolve(templateName);

  fs.readFile(templatePath, (err, dataFile) => {
    if(err) {
      throw "Ocorreu um erro lendo o arquivo de template"
    }

    let templateString = dataFile.toString();

    const regexp = new RegExp(/({{.+}})/g)

    regexp.test(templateString)
    
    const variaveis = templateString.match(regexp)
    
    if(variaveis){
      variaveis.map((variavel) => {
        const campo : string = variavel.replaceAll(/[{{}}]+/g, "");

        let valorCampo = getFieldValue(data, campo)
        console.log("campo nome")
        console.log(campo)
        console.log("campo valor")
        console.log(valorCampo);
        templateString = templateString.replaceAll(variavel, valorCampo)
      })
    }


    return resolve(templateString);
  })
})
}

export const generatePDFExample = async (req: Request, res: Response) => {
  try {
    const {templateID, data} = req.body as any
    const template = templates[templateID]
    if(template) {
     const templateFinal = await substituiVariaveis(template, data)
      const pdfStream = wkhtmltopdf(templateFinal, {
        pageSize: "A4",
        orientation: "Landscape"
      });

      // Configurar a resposta como PDF
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "inline; filename=plano_de_acao.pdf");
      // Enviar o PDF diretamente ao cliente
      pdfStream.pipe(res);
    }
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    res.status(500).json({ error: "Erro ao gerar o PDF" });
  }
};

const templates : {[key: string] : string} = {
  '1': 'teste.html',
  '2': 'teste2.html'
}
