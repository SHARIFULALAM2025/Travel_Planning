'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Container from '@/Components/Container/Container'
import { useLocale } from 'next-intl'

export default function NotFound() {
  const locale = useLocale()

  return (
    <div className="min-h-[80vh] flex items-center justify-center ">
      <Container>
        <div className="flex flex-col items-center text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full  aspect-video "
          >
            <Image
              src="https://i.ibb.co.com/prZwBW1t/Gemini-Generated-Image-f3ens1f3ens1f3en.png"
              alt="404 - Page Not Found"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href={`/${locale}`}
              className="px-8 py-3 sm:py-4 bottom-22 right-1/2 absolute bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg"
            >
              Go Back Home
            </Link>
          </motion.div>
        </div>
      </Container>
    </div>
  )
}
