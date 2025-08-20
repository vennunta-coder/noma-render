# NÔMA — Rede Social Minimalista (versão para Render)

## 🚀 Deploy no Render

1. Suba este repositório no GitHub.
2. Vá em [Render.com](https://render.com) → **New + → Web Service**.
3. Conecte ao repositório.
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `node app.js`
5. Render define automaticamente a variável `PORT`. O app já está configurado para usá-la.

## 📦 Persistência de dados

- Adicione um **Disk** no Render:
  - Nome: `data`
  - Path: `/app/data`
  - Size: pelo menos 1GB
- Assim, arquivos em `uploads/` e o banco `noma.db` ficam salvos entre deploys.

## 📂 Estrutura do projeto

- `app.js` → Código do app.
- `package.json` → Dependências.
- `data/uploads/` → Pasta para imagens/áudios enviados.
- `data/noma.db` → Banco SQLite (criado automaticamente).

---
👨‍💻 MVP minimalista pronto para deploy no Render.
