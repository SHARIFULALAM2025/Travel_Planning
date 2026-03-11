import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'
import Navbar from '@/Components/Header/Navbar'
import Footer from '@/Components/Footer/Footer'
import AuthProvider from '@/Provider/AuthProvider'
import { Toaster } from 'react-hot-toast'
import ThemeProvider from '@/Components/ThemeProvider/ThemeProvider'

// next-intl এর ইমপোর্টগুলো যোগ করুন
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Hind_Siliguri } from 'next/font/google'
import Container from '@/Components/Container/Container'
import TanstackProvider from '@/Components/ThemeProvider/TanstackProvider'



const hindSiliguri = Hind_Siliguri({
  variable: '--font-hind-siliguri',
  subsets: ['bengali'],
  weight: ['400', '700'],
})

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'TravelMate',
  description: 'Your Ultimate Travel Companion',
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params
  const messages = await getMessages({ locale })

  return (
    <html lang={locale} suppressHydrationWarning key={locale}>
      <body
        className={`${locale === 'bn' ? hindSiliguri.className : geistSans.className} antialiased w-full min-h-screen`}
      >
        <TanstackProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <AuthProvider>
              <ThemeProvider>
                <Navbar key={locale} />
                <main className="w-full min-h-screen">{children}</main>
                <Toaster
                  position="top-right"
                  reverseOrder={false}
                  toastOptions={{
                    duration: 5000,
                  }}
                />
                <Container>
                  <Footer />
                </Container>
              </ThemeProvider>
            </AuthProvider>
          </NextIntlClientProvider>
        </TanstackProvider>
      </body>
    </html>
  )
}
