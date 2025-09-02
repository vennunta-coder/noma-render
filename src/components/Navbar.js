export default function Navbar() {
  return (
    <nav className="p-4 bg-purple-800 flex justify-between items-center">
      <h1 className="text-2xl font-bold">KOKO</h1>
      <div className="space-x-4">
        <a href="/" className="hover:underline">Home</a>
        <a href="/jogos" className="hover:underline">Jogos</a>
        <a href="/comunidade" className="hover:underline">Comunidade</a>
        <a href="/match" className="hover:underline">Match</a>
        <a href="/chat" className="hover:underline">Chat</a>
        <a href="/sala-ai" className="hover:underline">Sala IA</a>
      </div>
    </nav>
  )
}
