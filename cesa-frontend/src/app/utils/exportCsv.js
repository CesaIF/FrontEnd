// MELHORIA FRONT-END: centraliza a chamada da nova rota de exportação criada no back-end.
// Evita repetir a lógica de download do CSV em todas as páginas.
export async function exportarCsv({ entidade, body, nomeArquivo }) {
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

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nomeArquivo;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}
