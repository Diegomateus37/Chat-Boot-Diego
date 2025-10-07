const chat = document.getElementById("chat");
const input = document.getElementById("msg");
let statusDiv = chat.querySelector('.status');

async function enviar() {
  const mensagem = input.value.trim();
  if (!mensagem) return;

  if(statusDiv){ statusDiv.remove(); statusDiv = null; }
  adicionarMensagem("user", mensagem);
  adicionarStatus("Pensando...");
  input.value = "";

  try {
    // Exemplo de resposta automática sem chave da OpenAI
    // Para uso real, troque por função serverless ou back-end seguro
    await new Promise(r => setTimeout(r, 1000));
    const resposta = "Essa é uma resposta de teste. Em produção, use API OpenAI via servidor seguro.";
    
    if(statusDiv){ statusDiv.remove(); statusDiv = null; }
    adicionarMensagem("bot", resposta);
  } catch (err) {
    if(statusDiv){ statusDiv.remove(); statusDiv = null; }
    adicionarMensagem("bot", "Erro: não foi possível conectar à IA.");
  }
}

function adicionarMensagem(tipo, texto) {
  const div = document.createElement("div");
  div.className = "msg " + tipo;
  div.innerHTML = texto;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function adicionarStatus(texto) {
  const div = document.createElement("div");
  div.className = "status";
  div.textContent = texto;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
  statusDiv = div;
}

input.addEventListener("keypress", (e) => { if(e.key==="Enter") enviar(); });
