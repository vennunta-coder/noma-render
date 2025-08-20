// NÔMA — versão para Render (com persistência em /data)
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { nanoid } = require("nanoid");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const csrf = require("csurf");

const app = express();
const PORT = process.env.PORT || 3000;

// Usar /data no Render (Disks)
const DATA_DIR = path.join(__dirname, "data");
const UPLOAD_DIR = path.join(DATA_DIR, "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(UPLOAD_DIR));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
const csrfProtection = csrf({ cookie: true });

// Sessões em memória
const SESSIONS = new Map();
function setSession(res, user) {
  const sid = nanoid(24);
  SESSIONS.set(sid, { id: user.id, username: user.username, nickname: user.nickname, anon: user.anon });
  res.cookie("sid", sid, { httpOnly: true, sameSite: "lax" });
}
function getSession(req) {
  const sid = req.cookies?.sid;
  return sid && SESSIONS.get(sid);
}
function clearSession(res, req) {
  const sid = req.cookies?.sid;
  if (sid) SESSIONS.delete(sid);
  res.clearCookie("sid");
}

// Banco de dados persistente
const db = new sqlite3.Database(path.join(DATA_DIR, "noma.db"));
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users(
    id TEXT PRIMARY KEY, username TEXT UNIQUE, email TEXT UNIQUE, passwordHash TEXT,
    nickname TEXT, anon INTEGER DEFAULT 0, createdAt INTEGER)`);
  db.run(`CREATE TABLE IF NOT EXISTS posts(id TEXT PRIMARY KEY,userId TEXT,text TEXT,createdAt INTEGER)`);
  db.run(`CREATE TABLE IF NOT EXISTS images(id TEXT PRIMARY KEY,userId TEXT,path TEXT,createdAt INTEGER)`);
  db.run(`CREATE TABLE IF NOT EXISTS audios(id TEXT PRIMARY KEY,userId TEXT,path TEXT,createdAt INTEGER)`);
});

// Helpers e rotas (iguais à versão Replit) ...
// (para brevidade omitido aqui, mas seria igual ao app.js anterior)

app.listen(PORT,()=>console.log("NÔMA rodando em http://localhost:"+PORT));
