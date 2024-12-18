interface FooterProps {
    paginaAtual: number;
    totalPaginas: number;
  }

  export const getFooter = ({
    paginaAtual,
    totalPaginas,
  }: FooterProps): string => {
    return `
      <div class="page-footer" style="text-align: center; font-size: 12px;">
        Página ${paginaAtual} de ${totalPaginas}
      </div>
    `;
  };
