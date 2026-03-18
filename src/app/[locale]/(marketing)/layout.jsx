import Footer from '@/Components/Footer/Footer'
import Navbar from '@/Components/Header/Navbar'

const MarketingLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}

export default MarketingLayout
