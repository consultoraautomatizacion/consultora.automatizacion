import Header from './components/Header'
import Hero from './components/Hero'
import Solutions from './components/Solutions'
import Process from './components/Process'
import UseCases from './components/UseCases'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Solutions />
        <Process />
        <UseCases />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
