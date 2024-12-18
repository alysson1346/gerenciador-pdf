interface DynamicColumn {
    title: string; // Título da coluna
    content: string; // Conteúdo da coluna
  }

  interface DynamicTableConfig {
    columnsPerRow: number; // Número de colunas por linha
    data: DynamicColumn[]; // Dados da tabela
  }

  /**
   * Gera uma tabela HTML dinâmica com colunas configuráveis.
   */
  export function dynamicColumn({ columnsPerRow, data }: DynamicTableConfig): string {
    let html = `<table style="border-collapse: collapse; width: 100%;">`;

    for (let i = 0; i < data.length; i += columnsPerRow) {
      const row = data.slice(i, i + columnsPerRow);
      html += `<tr>`;
      row.forEach((col) => {
        // Adiciona o cabeçalho (título da coluna)
        html += `
          <th style="border: 1px solid black; padding: 8px; text-align: left;">
            ${col.title}
          </th>
        `;
        // Adiciona o conteúdo da coluna
        html += `
          <td style="border: 1px solid black; padding: 8px;">
            ${col.content}
          </td>
        `;
      });
      html += `</tr>`;
    }

    html += `</table>`;
    return html;
  }
