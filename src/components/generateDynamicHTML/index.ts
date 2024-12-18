export function generateDynamicHTML(
    divisions: Array<{ width?: string; divisions: any }> = [] ,// Atualiza tipo para refletir largura e divisões
    height?: string
  ): string {
    const style = `
        <style>
        .box {
            display: flex;
            width: 100%;
        }

        .column {
            display: flex;
            flex-direction: column;
            border: 1px solid black; /* Borda externa */
            box-sizing: border-box;
        }

        .column:not([style*="width"]) {
            flex: 1;
        }

        .sub-column-grouped {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            text-align: center;
        }

        .sub-column {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            flex: 1;
            outline: 0.5px solid black; /* Substitui a borda */
            box-sizing: border-box;
        }

        .sub-column-title {
            font-weight: bold;
            font-size: 16px;
            padding-right: 5px;
        }

        .sub-column-text {
            font-size: 14px;
        }
        </style>

    `;

    function renderSubColumns(subDivisions: Array<{ title: string; text?: string; titleSize?: string; textSize?: string } | any>): string {
        return subDivisions
          .map((sub) => {
            if (Array.isArray(sub)) {
              // Renderiza sub-divisões aninhadas
              return `
                <div class="sub-column-grouped">
                  ${renderSubColumns(sub)}
                </div>
              `;
            } else if (typeof sub === "object" && sub.title) {
              // Renderiza sub-colunas com `title` e `text`
              const titleSize = sub.titleSize || "16px";
              const textSize = sub.textSize || "16px";

              return `
                <div class="sub-column">
                  <p class="sub-column-title" style="font-size: ${titleSize}">${sub.title || ''}</p>
                  <p class="sub-column-text" style="font-size: ${textSize}">${sub.text || ''}</p>
                </div>
              `;
            }
          })
          .join("");
      }


    let columnsHTML = "";
    for (let i = 0; i < divisions.length; i++) {
      const division = divisions[i];
      const divisionHTML = division ? renderSubColumns(division.divisions) : "";

      // Adiciona a largura à coluna se definida
      columnsHTML += `
        <div class="column" style="width: ${division.width || '100%'}; min-height: ${height || 'auto'};">
          ${divisionHTML}
        </div>
      `;
    }

    return `
      ${style}
      <div class="box">
        ${columnsHTML}
      </div>
    `;
  }