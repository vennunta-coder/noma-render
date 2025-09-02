import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Comunidade() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <h1 className="text-4xl font-bold">Explora o feed e faz amigos 🤝</h1>
      </main>
      <Footer />
    </div>
  )
}
