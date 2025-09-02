// Código App.jsx completo (sem numeração para rodar)
import { useEffect, useState } from "react";

const storage = {
  get: (k, fallback) => {
    try { return JSON.parse(localStorage.getItem(k) || "null") ?? fallback; } catch { return fallback; }
  },
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v))
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => storage.get("fpnl_user", null));
  const [authMode, setAuthMode] = useState(null);
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "", bio: "" });

  const [messages, setMessages] = useState(() => storage.get("fpnl_messages", []));
  const [input, setInput] = useState("");

  const [apoioMode, setApoioMode] = useState(null);
  const [apoioChat, setApoioChat] = useState([]);
  const [apoioInput, setApoioInput] = useState("");

  const [profiles, setProfiles] = useState(() => storage.get("fpnl_profiles", []));

  useEffect(() => storage.set("fpnl_messages", messages), [messages]);
  useEffect(() => storage.set("fpnl_user", currentUser), [currentUser]);
  useEffect(() => storage.set("fpnl_profiles", profiles), [profiles]);

  const handleRegister = (e) => {
    e?.preventDefault();
    const { name, email, password, bio } = authForm;
    if (!name || !email || !password) return alert("Preencha todos os campos.");
    const newUser = { id: Date.now(), name, email, password, bio, img: `https://api.dicebear.com/7.x/initials/svg?seed=${name}` };
    setCurrentUser(newUser);
    setProfiles([{ name: newUser.name, age: 0, bio: newUser.bio, img: newUser.img }, ...profiles]);
    setAuthMode(null);
  };

  const handleLogin = (e) => {
    e?.preventDefault();
    const { email } = authForm;
    const user = { id: Date.now(), name: email.split("@")[0], email, password: "***", bio: "", img: `https://api.dicebear.com/7.x/identicon/svg?seed=${email}` };
    setCurrentUser(user);
    setAuthMode(null);
  };

  const handleSend = () => {
    if (!currentUser) return alert("Faça login para postar.");
    if (input.trim() !== "") {
      setMessages([{ id: Date.now(), user: currentUser.name, text: input, likes: 0, comments: [] }, ...messages]);
      setInput("");
    }
  };

  const sendApoioMsg = () => {
    if (!apoioInput.trim()) return;
    const userMsg = { from: "Você", text: apoioInput };
    const aiResponse = { from: "IA Apoio 🌸", text: `Estou aqui com você. Você disse: “${apoioInput}”. Respire fundo, está tudo bem 💜` };
    setApoioChat([...apoioChat, userMsg, aiResponse]);
    setApoioInput("");
  };

  const conselhos = [
    "🌱 Lembre-se: cada dia é um novo começo.",
    "💜 Você merece ser amada exatamente como é.",
    "🌈 Sua voz importa e inspira outras pessoas.",
    "☀️ Respire fundo: você é mais forte do que imagina."
  ];

  const frasesMotivacionais = [
    "Você é única e especial. 💖",
    "Continue, você está florescendo. 🌸",
    "Sua luz ilumina quem está ao seu redor. ✨",
    "Ser lésbica é ser livre. 🌈"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-white text-gray-800">
      <header className="p-4 flex justify-between items-center bg-white/70 backdrop-blur-md shadow sticky top-0 z-50">
        <h1 className="text-xl font-bold text-pink-600">Feito Pensando nas Lésbicas</h1>
        <nav className="hidden md:flex gap-4">
          <a href="#mural" className="hover:text-pink-600">Mural</a>
          <a href="#apoio" className="hover:text-pink-600">Apoio Emocional</a>
          <a href="#perfis" className="hover:text-pink-600">Perfis</a>
        </nav>
        <div>
          {currentUser ? (
            <button onClick={() => setCurrentUser(null)} className="px-3 py-1 bg-gray-700 text-white rounded-xl">Sair</button>
          ) : (
            <button onClick={() => setAuthMode("login")} className="px-3 py-1 bg-purple-600 text-white rounded-xl">Entrar</button>
          )}
        </div>
      </header>

      <section className="text-center py-14 px-6">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-purple-700">Um espaço criado com amor e orgulho</h2>
        <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-600">Celebrando as vozes, histórias e culturas lésbicas.</p>
      </section>

      <section id="apoio" className="py-16 px-6 bg-gradient-to-r from-pink-50 to-purple-50">
        <h3 className="text-3xl font-bold text-center text-pink-600 mb-8">Sala de Apoio Emocional 💜</h3>
        {!apoioMode ? (
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <button onClick={() => setApoioMode("texto")} className="p-6 bg-white rounded-2xl shadow hover:shadow-lg">💬 Conversar por Texto</button>
            <button onClick={() => setApoioMode("voz")} className="p-6 bg-white rounded-2xl shadow hover:shadow-lg">🎙️ Falar e Ouvir</button>
            <button onClick={() => setApoioMode("conselhos")} className="p-6 bg-white rounded-2xl shadow hover:shadow-lg">💡 Receber Conselhos</button>
            <button onClick={() => setApoioMode("motivacional")} className="p-6 bg-white rounded-2xl shadow hover:shadow-lg">✨ Mensagens Motivacionais</button>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow">
            <button onClick={() => { setApoioMode(null); setApoioChat([]); }} className="mb-4 text-sm text-gray-500">← Voltar</button>
            {apoioMode === "texto" && (
              <div>
                <div className="h-64 overflow-y-auto border rounded-xl p-3 mb-3 space-y-2 bg-gray-50">
                  {apoioChat.map((m, i) => (
                    <div key={i} className={`p-2 rounded-xl ${m.from === "Você" ? "bg-pink-100 text-right" : "bg-purple-100"}`}>{m.from}: {m.text}</div>
                  ))}
                  {apoioChat.length === 0 && <p className="text-gray-500 italic">Comece a conversa 🌸</p>}
                </div>
                <div className="flex gap-2">
                  <input value={apoioInput} onChange={(e) => setApoioInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendApoioMsg()} placeholder="Escreva aqui..." className="flex-1 px-3 py-2 border rounded-xl"/>
                  <button onClick={sendApoioMsg} className="px-4 bg-pink-600 text-white rounded-xl">Enviar</button>
                </div>
              </div>
            )}
            {apoioMode === "voz" && (
              <p className="text-gray-600 italic">🎙️ Em breve: suporte por voz.</p>
            )}
            {apoioMode === "conselhos" && (
              <ul className="space-y-3">
                {conselhos.map((c, i) => <li key={i} className="p-3 bg-pink-50 rounded-xl">{c}</li>)}
              </ul>
            )}
            {apoioMode === "motivacional" && (
              <div className="text-center">
                <p className="p-4 bg-pink-50 rounded-xl mb-4">{frasesMotivacionais[Math.floor(Math.random() * frasesMotivacionais.length)]}</p>
                <button onClick={() => setApoioMode("motivacional")} className="px-4 py-2 bg-purple-600 text-white rounded-xl">Quero outra ✨</button>
              </div>
            )}
          </div>
        )}
      </section>

      <section id="mural" className="py-16 px-6 bg-white">
        <h3 className="text-3xl font-bold text-center text-pink-600 mb-6">Mural da Comunidade</h3>
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-2 mb-4">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={currentUser ? "Compartilhe algo..." : "Entre para postar"} className="flex-1 px-4 py-2 border rounded-2xl"/>
            <button onClick={handleSend} className="px-4 py-2 bg-pink-600 text-white rounded-2xl">Postar</button>
          </div>
          {messages.map((m) => (
            <div key={m.id} className="p-4 bg-pink-50 rounded-xl shadow mb-2">
              <p className="font-semibold">{m.user}</p>
              <p>{m.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="perfis" className="py-16 px-6 bg-gradient-to-r from-purple-50 to-pink-50">
        <h3 className="text-3xl font-bold text-center text-purple-600 mb-8">Perfis da Comunidade</h3>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {profiles.map((p, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl shadow text-center">
              <img src={p.img} alt={p.name} className="w-24 h-24 rounded-full mx-auto mb-3"/>
              <h4 className="font-semibold">{p.name}</h4>
              <p className="text-sm text-gray-600">{p.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {authMode && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h4 className="text-lg font-semibold mb-4">{authMode === "login" ? "Entrar" : "Criar conta"}</h4>
            <form onSubmit={authMode === "login" ? handleLogin : handleRegister} className="grid gap-3">
              {authMode === "register" && (
                <input placeholder="Nome" className="px-3 py-2 border rounded-xl" value={authForm.name} onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}/>
              )}
              <input type="email" placeholder="Email" className="px-3 py-2 border rounded-xl" value={authForm.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}/>
              <input type="password" placeholder="Senha" className="px-3 py-2 border rounded-xl" value={authForm.password} onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}/>
              {authMode === "register" && (
                <textarea placeholder="Bio (opcional)" className="px-3 py-2 border rounded-xl" value={authForm.bio} onChange={(e) => setAuthForm({ ...authForm, bio: e.target.value })}/>
              )}
              <button type="submit" className="px-4 py-2 bg-pink-600 text-white rounded-xl">{authMode === "login" ? "Entrar" : "Cadastrar"}</button>
            </form>
          </div>
        </div>
      )}

      <footer className="py-8 text-center text-gray-500 bg-white border-t mt-10">
        <p>Feito com 🌈 e 💜 para todas as lésbicas • © 2025</p>
      </footer>
    </div>
  );
}
