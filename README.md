🌐 Tecnologias Utilizadas

 Vite – Build ultrarrápido

⚛️ React – Biblioteca principal de UI

🎨 Tailwind CSS – Estilização rápida e customizável

🔁 Axios – Requisições HTTP

🌍 React Router DOM – Rotas SPA

💡 Context API / Zustand (opcional) – Gerenciamento de estado

📦 Instalação

# 1. Acesse a pasta do frontend
cd frontend

# 2. Instale as dependências
npm install

# 3. Rode o projeto localmente
npm run dev

Acesse o app em: http://localhost:5173

🗀️ Estrutura de Pastas

📁 src
 ├ 📂components      # Componentes reutilizáveis
 ├ 📂pages           # Páginas principais do sistema
 ├ 📂services        # Comunicação com backend (Axios)
 ├ 📂contexts        # Contextos globais (autenticação, etc.)
 ├ 📂assets          # Imagens, ícones e fontes
 ├ 📌App.jsx         # Configuração geral de rotas
 └ 📌main.jsx        # Ponto de entrada da aplicação

🔐 Funcionalidades



✨ Telas

Tela de Login

Dashboard Principal





⚙️ Variáveis de Ambiente

Crie um arquivo .env na raiz do frontend com:

VITE_API_BASE_URL=http://localhost:3000

📌 Observações

O frontend espera que o backend esteja rodando localmente na porta 3000

Se necessário, altere o valor da variável VITE_API_BASE_URL no arquivo .env
