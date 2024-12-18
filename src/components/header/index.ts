interface HeaderProps {
  origem: string;
  tipoInspecao: string;
  logoUrl: string;
  dataHora: string;
  paginaAtual: number;
  totalPaginas: number;
}

export const getHeader = ({
  origem,
  tipoInspecao,
  logoUrl,
  dataHora,
  paginaAtual,
  totalPaginas,
}: HeaderProps): string => {
  return `
    <div class="header" style="display: flex; justify-content: space-between; align-items: center;">
      <div>
        <p><strong>Origem</strong>: ${origem}</p>
        <p>${tipoInspecao}</p>
      </div>
      <div class="logo">
        <img src="${logoUrl}" alt="Logo" style="max-height: 50px;">
      </div>
      <div class="info">
        <p>PÁG ${paginaAtual}/${totalPaginas}</p>
        <p>${dataHora}</p>
      </div>
    </div>
  `;
};
