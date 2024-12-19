import { Readable } from "stream";
import wkhtmltopdf from "wkhtmltopdf";
import { getHeader } from "../../components/header";
import { getFooter } from "../../components/footer";
import { generateDynamicHTML } from "../../components/generateDynamicHTML";
import { text } from "stream/consumers";

interface PdfOptions {
  origem: string;
  tipoInspecao: string;
  logoUrl: string;
  dataHora: string;
  paginaAtual: number;
  totalPaginas: number;
}

export const generatePdf = async (
//   content: string,
//   options: PdfOptions
): Promise<Readable> => {
//   const { origem, tipoInspecao, logoUrl, dataHora, paginaAtual, totalPaginas } = options;
const header = generateDynamicHTML([
    {
      width: '70%', // Largura da primeira coluna
      divisions: [{ title: "Inspeção 3464", titleSize:"x-large" }],
    },
    {
      width: '30%', // Largura da segunda coluna
      divisions: [
        { title: "TERRITÓRIO RIO DOCE - 1.4" },
        [
          { title: "REV. 00" },
          { title: "PÁG 1/1" },
        ],
        { title: "16/07/2024 às 13:01:00" },
      ],
    },
  ], '200px');

  const table1 = generateDynamicHTML([
    {
      divisions: [{ title: "Elemento do Sistema" , text:'GESTÃO DE RISCOS', titleSize:''}],
    },
    {
      divisions: [
        { title: "Atividade", text:'CONTATO COM REDE ELÉTRICA (RISCOS ELÉTRICOS)' },
      ],
    },
  ]);

  const table2 = generateDynamicHTML([
    {
      divisions: [{ title: "Localização", text:'Fundação Renova - 1 | TERRITÓRIO RIO DOCE - 1.4' }],
    }
  ]);

  const table3 = generateDynamicHTML([
    {
      divisions: [{ title: "Local de Referência", text:'teste' }],
    }
  ]);

  const table4 = generateDynamicHTML([
    {
      divisions: [{ title: "Participantes", text:'-' }],
    }
  ]);



  const htmlContent = `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: "Arial", sans-serif;
            font-size: 12px;
            margin: 0;
            padding: 10px;
          }
        </style>
      </head>
      <body>
        ${header}
        ${table1}
        ${table2}
        ${table3}
        ${table4}
      </body>
    </html>
  `;

  console.log('htmlContent')
  console.log(htmlContent)

  return new Promise((resolve, reject) => {
    try {
        const pdfStream = wkhtmltopdf(htmlContent, {
            pageSize: "A4",
            orientation: "Landscape"
           /*  footerRight: "[page] de [topage]", // Certifique-se de que essa string seja válida
            footerFontSize: 10 as number,               // Certifique-se de que é um número válido
            headerSpacing: 5,               // Converta para string, se necessário
            marginTop: "20",                  // Certifique-se de que é do tipo string/número
            marginBottom: "40",   */             // Certifique-se de que é do tipo string/número
          });


      resolve(pdfStream);
    } catch (error) {
      reject(error);
    }
  });
};