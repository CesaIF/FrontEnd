# CESA - Front-End

## 🌐 Tecnologias Utilizadas

### <img src"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" /> React – Biblioteca principal de UI

### 

## 📦 Instalação

### Crie uma pasta em qualquer diretório e acesse-a.
```
mkdir CESAIF && cd CESAIF
```

### Clone o repositório frontend dentro da pasta:
```
git clone "https://github.com/CesaIF/FrontEnd.git"
```

### Em seguida, clone no mesmo diretório o serviço backend.
```
git clone "https://github.com/CesaIF/back-end.git"
```

### Acesse o diretório back-end criado na clonagem.
```
cd back-end
```

### Paa cria os container digite o seguindo no diretório:
```
docker-compose up -d
```

## Acesse o app em: http://localhost:3005

## 🗀️ Estrutura de Pastas
```plaintext
📁 src
 ├ 📂components      # Componentes reutilizáveis
 ├ 📂pages           # Páginas principais do sistema
 ├ 📂services        # Comunicação com backend (Axios)
 ├ 📂contexts        # Contextos globais (autenticação, etc.)
 ├ 📂assets          # Imagens, ícones e fontes
 ├ 📌App.jsx         # Configuração geral de rotas
 └ 📌main.jsx        # Ponto de entrada da aplicação
```

## 🔐 Funcionalidades

- Gerência de locações de veículos para viagens oficiais.
  
- Gerência de Motoristas, porteiros, gestores.

- Gerência de veículos.

- Acesso a dados e histórico das locações.

## ✨ Telas

- Tela de Login

- Dashboard Principal

- Tela de Motoristas

- Tela de Porteiros

- Tela do perfil

- Tela de Histórico

- Tela de Recuperar senha

## ⚙️ Variáveis de Ambiente

Crie um arquivo .env na raiz do frontend com:

```
NEXT_PUBLIC_LOCAL: https://localhost:3000
```

📌 Observações

O frontend espera que o backend esteja rodando localmente na porta 3000.

Se necessário, altere o valor da variável NEXT_PUBLIC_LOCAL no arquivo .env.
