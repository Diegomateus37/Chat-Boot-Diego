import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());
app.use(express.static("public")); // serve index.html e assets

// Instancia OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Socket.io - chat em tempo real
io.on("connection", (socket) => {
  console.log("Usuário conectado");

  socket.on("mensagem", async (msg) => {
    try {
      // envia mensagem para OpenAI
      const resposta = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: msg }],
      });

      const texto = resposta.choices[0].message.content;
      socket.emit("resposta", texto);
    } catch (error) {
      console.error(error);
      socket.emit("resposta", "Erro ao se comunicar com a IA.");
    }
  });

  socket.on("disconnect", () => {
    console.log("Usuário desconectado");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
