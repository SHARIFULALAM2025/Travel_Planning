'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { FaGithub } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { IoMdEyeOff } from 'react-icons/io'
import { IoEye, IoMail } from 'react-icons/io5'
import { useTheme } from 'next-themes'
import { FaLock } from 'react-icons/fa'
import { useTranslations } from 'next-intl'
import Container from '../Container/Container'

const Login = () => {
  const t = useTranslations('loginPage')
  const [showPassword, setShowPassword] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const signupImage = [
    'https://i.ibb.co.com/SXchBqdh/Study-abroad-pana.png',
    'https://i.ibb.co.com/Z1wCXj7D/Globalization-bro.png',
    'https://i.ibb.co.com/RG28Hb6L/Trip-amico.png',
    'https://i.ibb.co.com/G3tYVpgM/Travel-insurance-cuate.png',
    'https://i.ibb.co.com/gLq21Gn6/Hotel-Booking-amico.png',
  ]
  const handelShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const router = useRouter()

  const HandelSocialLogin = async () => {
    sessionStorage.setItem('loginSuccess', 'true')
    await signIn('google', {
      callbackUrl: '/',
    })
  }

  const HandelGitHubLogin = async () => {
    sessionStorage.setItem('loginSuccess', 'true')
    await signIn('github', {
      callbackUrl: 'https://travel-planning-ivory.vercel.app',
    })
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleLogin = async (data) => {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (result?.error) {
      toast.error('Invalid credentials')
    } else {
      toast.success('Login successful!')
      router.push('/')
    }
  }
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === signupImage.length - 1 ? 0 : prevIndex + 1
      )
    },3000)

    return () => clearInterval(interval) // Cleanup on unmount
  }, [])

  if (!mounted) return null

  return (
    <Container>
      <div
        className={`${theme == 'dark' ? 'bg-slate-900' : 'bg-white'} min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10`}
      >
        <div className="w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-white/40">
          {/* Left Section - Hidden on Mobile/Tablet or adjusted height */}
          <div className="relative h-64 lg:h-auto overflow-hidden">
            <Image
              src={signupImage[currentImageIndex]}
              alt="Login Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-1/2 left-8 text-black">
              <h2 className="text-2xl md:text-5xl -rotate-45 font-bold leading-tight bg-gradient-to-r from-pink-500 via-green-500 to-indigo-600 bg-clip-text text-transparent">
                {t('side-text1')}
              </h2>
              <p className="mt-2 md:mt-3 -rotate-45 text-sm md:text-3xl md:font-bold bg-gradient-to-r from-teal-500 via-pink-500  to-green-700 bg-clip-text text-transparent">
                {t('side-text2')}
              </p>
            </div>
          </div>

          {/* Right Section - Content padding adjusted for small screens */}
          <div
            className={`p-6 sm:p-10 md:p-14 flex flex-col justify-center ${theme == 'dark' ? 'bg-slate-800 lg:bg-transparent' : 'bg-white lg:bg-transparent'}`}
          >
            <div className="mb-6 md:mb-10 space-y-2">
              <h1
                className={`font-bold text-center md:text-3xl  ${theme == 'dark' ? 'text-white' : 'text-black'}`}
              >
                {t('login-h1')}
              </h1>
              <p
                className={`font-bold text-center text-xs md:text-xl ${theme == 'dark' ? 'text-white' : 'text-black'}`}
              >
                {t('login-h2')}
              </p>
            </div>

            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(handleLogin)}
            >
              {/* Email */}
              <div className="relative">
                <label
                  className={`block text-sm font-medium ${theme == 'dark' ? 'text-white' : 'text-black'} mb-1`}
                >
                  {t('email-address')}
                </label>
                <div className="relative">
                  <input
                    {...register('email', { required: true })}
                    type="email"
                    placeholder={t('placeholder-email')}
                    className={`w-full px-4 py-3 pl-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${theme == 'dark' ? 'bg-slate-700 text-white placeholder-slate-300' : 'bg-white text-black placeholder-gray-400'}`}
                  />
                  <IoMail
                    className={`absolute top-1/2 -translate-y-1/2 left-3 ${theme == 'dark' ? 'text-white' : 'text-gray-500'}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">Email is required</p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <label
                  className={`block text-sm font-medium ${theme == 'dark' ? 'text-white' : 'text-black'} mb-1`}
                >
                  {t('password')}
                </label>
                <div className="relative">
                  <input
                    {...register('password', { required: true })}
                    type={showPassword ? 'password' : 'text'}
                    placeholder={t('placeholder-password')}
                    className={`w-full px-4 py-3 pl-10 pr-12 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${theme == 'dark' ? 'bg-slate-700 text-white placeholder-slate-300' : 'bg-white text-black placeholder-gray-400'}`}
                  />
                  <FaLock
                    className={`absolute top-1/2 -translate-y-1/2 left-3 ${theme == 'dark' ? 'text-white' : 'text-gray-500'}`}
                  />
                  <div
                    onClick={handelShowPassword}
                    className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
                  >
                    {showPassword ? (
                      <IoMdEyeOff
                        className={`${theme == 'dark' ? 'text-white' : 'text-black'}`}
                      />
                    ) : (
                      <IoEye
                        className={`${theme == 'dark' ? 'text-white' : 'text-black'}`}
                      />
                    )}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    Password is required
                  </p>
                )}
              </div>

              <div className="text-sm text-end">
                <Link
                  href="/reset"
                  className={`text-xs md:text-sm ${theme == 'dark' ? 'text-indigo-400' : 'text-indigo-600'} hover:underline`}
                >
                  {t('passwordForgot')}
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all active:scale-[0.98]"
              >
                {t('login-button')}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6 md:my-8">
              <div className="grow border-t border-gray-300"></div>
              <span
                className={`mx-4 text-[10px] md:text-sm ${theme == 'dark' ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}
              >
                {t('text-h1')}
              </span>
              <div className="grow border-t border-gray-300"></div>
            </div>

            {/* Social Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => HandelSocialLogin('google')}
                className="w-full py-3 border border-gray-300 rounded-xl flex items-center justify-center gap-3 bg-white text-gray-800 hover:bg-gray-50 transition-all font-medium text-sm md:text-base"
              >
                <FcGoogle size={20} /> {t('google-button')}
              </button>

              <button
                onClick={() => HandelGitHubLogin('github')}
                className="w-full py-3 bg-black text-white rounded-xl flex items-center justify-center gap-3 hover:bg-gray-900 transition-all font-medium text-sm md:text-base"
              >
                <FaGithub size={20} />
                {t('github-button')}
              </button>
            </div>

            <p
              className={`text-center text-xs md:text-sm mt-6 ${theme == 'dark' ? 'text-white' : 'text-black'}`}
            >
              {t('text-p')}
              <Link
                href="/signup"
                className="text-indigo-600 ml-2 font-semibold hover:underline"
              >
                {t('signupText')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Login
