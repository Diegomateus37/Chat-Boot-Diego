async function enviar() {
  const mensagem = input.value.trim();
  if (!mensagem) return;

  if(statusDiv){ statusDiv.remove(); statusDiv = null; }
  adicionarMensagem("user", mensagem);
  adicionarStatus("Pensando...");
  input.value = "";

  try {
    const res = await fetch("/api/chat", {    // <-- garante que chama a função serverless
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: mensagem })
    });

    const data = await res.json();
    if(statusDiv){ statusDiv.remove(); statusDiv = null; }
    adicionarMensagem("bot", data.reply.replace(/\n/g,"<br>"));
  } catch (err) {
    if(statusDiv){ statusDiv.remove(); statusDiv = null; }
    adicionarMensagem("bot", "Erro: não foi possível conectar à IA.");
  }
}
