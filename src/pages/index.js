import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <h1 className="text-4xl font-bold">Bem-vindo ao KOKO 🎮</h1>
      </main>
      <Footer />
    </div>
  )
}
