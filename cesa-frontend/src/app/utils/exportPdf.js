// MELHORIA FRONT-END: centraliza a chamada da nova rota de exportação criada no back-end.
// MELHORIA FRONT-END: exportação atualizada para PDF em todas as páginas.
// Mantém a rota unificada do back-end e apenas ajusta o download para o novo formato.
export async function exportarPdf({ entidade, body, nomeArquivo }) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_LOCAL}/relatorio/exportar/${entidade}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    let mensagem = "Erro ao exportar os dados.";
    try {
      const erro = await response.json();
      mensagem = erro.error || erro.message || mensagem;
    } catch {
      const texto = await response.text();
      if (texto) mensagem = texto;
    }
    throw new Error(mensagem);
  }

  // MELHORIA FRONT-END: força o MIME type correto para evitar que o navegador
  // trate o relatório como CSV ou arquivo genérico.
  const dados = await response.blob();
  const blob = new Blob([dados], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nomeArquivo;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}
