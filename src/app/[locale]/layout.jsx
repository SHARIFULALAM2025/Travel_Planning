import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'
import AuthProvider from '@/Provider/AuthProvider'
import { Toaster } from 'react-hot-toast'
import ThemeProvider from '@/Components/ThemeProvider/ThemeProvider'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Hind_Siliguri } from 'next/font/google'
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
                {/* Navbar এবং Footer এখান থেকে সরিয়ে (marketing)/layout.jsx এ নিয়ে যান */}

                <main className="w-full min-h-screen">
                  {children}
                </main>

                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 5000,
                  }}
                />
              </ThemeProvider>
            </AuthProvider>
          </NextIntlClientProvider>
        </TanstackProvider>
      </body>
    </html>
  )
}