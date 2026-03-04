'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { uploadImage } from '../ReusableFunction/UploadImage'
import bcrypt from 'bcryptjs'
import { signIn } from 'next-auth/react'
import { postUser } from '@/app/option/saveUser'
import toast from 'react-hot-toast'
import { FaLock } from 'react-icons/fa6'
import { IoMail } from 'react-icons/io5'
import { FaUserTie } from 'react-icons/fa'


import { FaGithub } from 'react-icons/fa6'
import { useTheme } from 'next-themes'
import { IoEye } from 'react-icons/io5'
import { IoMdEyeOff } from 'react-icons/io'
import { useTranslations } from 'next-intl'

const Signup = () => {
  const t = useTranslations('signupPage')
   const { theme } = useTheme()
   const [mounted, setMounted] = useState(false)
  const [showPassword, setShowPassword] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const signupImage = [
    'https://i.ibb.co.com/SXchBqdh/Study-abroad-pana.png',
    'https://i.ibb.co.com/G3tYVpgM/Travel-insurance-cuate.png',
    'https://i.ibb.co.com/gLq21Gn6/Hotel-Booking-amico.png',
    'https://i.ibb.co.com/Z1wCXj7D/Globalization-bro.png',
    'https://i.ibb.co.com/RG28Hb6L/Trip-amico.png',
  ]


  useEffect(() => {
    setMounted(true)
  }, [])


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === signupImage.length - 1 ? 0 : prevIndex + 1
      )
    }, 3000)

    return () => clearInterval(interval) // Cleanup on unmount
  }, [])
  const handelShowPassword = () => {
    setShowPassword(!showPassword)
  }


  const HandelSocialLogin = async () => {
    sessionStorage.setItem("loginSuccess","true")
     await signIn('google', {
      callbackUrl: '/'
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
    reset,
    formState: { errors },
  } = useForm()

  const handleSignUp = async (data) => {
    try {
      const { name, email, password, image } = data
      if (!image || image.length == 0) {
        toast.error('please select an image')
        return
      }
      const profileImage = image[0]
      const userImage = await uploadImage(profileImage)
      const hasPassword = await bcrypt.hash(password, 10)
      if (!userImage) {
        toast.error('image upload failed')
        return
      }
      await postUser({ name, email, password: hasPassword, image: userImage })

      toast.success('user save successfully')
      await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: '/',
      })
      reset()
    } catch (error) {
      if (error.response?.status == 400) {
        toast.error('email already exist')
      } else {
        console.error(error)
        toast.error('something went wrong')
      }
    }
  }

  if (!mounted) return null


  return (
    <div
      className={`min-h-screen ${theme == 'dark' ? 'bg-slate-900' : 'bg-slate-50'} flex items-center justify-center p-3 sm:p-5`}
    >
      <div className="max-w-5xl w-full rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-white/10">
        {/* Left Side: Visual/Branding - Mobile এ hidden থেকে tablet/laptop এ আসবে */}
        <div
          className={`relative h-64 lg:h-auto overflow-hidden  ${theme == 'dark' ? 'bg-slate-800' : 'bg-slate-50 opacity-200'}`}
        >
          <Image
            src={signupImage[currentImageIndex]} //image show one by one per 20 second
            alt="Workspace inspiration"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-1/2  space-y-4 left-8 text-black">
            <h2 className="text-2xl md:text-4xl -rotate-45 font-bold leading-tight bg-gradient-to-r from-pink-500 via-green-500 to-indigo-600 bg-clip-text text-transparent">
              {t('side-text1')}
            </h2>
            <p className="mt-2 md:mt-3 -rotate-45 text-sm md:text-3xl md:font-bold bg-gradient-to-r from-teal-500 via-pink-500  to-green-700 bg-clip-text text-transparent">
              {t('side-text2')}
            </p>
          </div>
        </div>

        {/* Right Side: The Form */}
        <div
          className={`p-6 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-center ${theme == 'dark' ? 'bg-slate-800' : 'bg-white'}`}
        >
          <div className="mb-6">
            <h2
              className={`text-2xl sm:text-3xl font-extrabold ${theme == 'dark' ? 'text-white' : 'text-gray-900'} text-center md:text-left`}
            >
              {t('login-text')}
            </h2>
            <p
              className={`mt-2 text-sm sm:text-base font-medium ${theme == 'dark' ? 'text-slate-300' : 'text-gray-600'} text-center md:text-left`}
            >
              {t('login-h1')}
            </p>
          </div>

          <form
            className="space-y-4 sm:space-y-5"
            onSubmit={handleSubmit(handleSignUp)}
          >
            {/* Full Name */}
            <div className="relative">
              <label
                htmlFor="fullName"
                className={`block text-sm font-medium ${theme == 'dark' ? 'text-white' : 'text-black'} mb-1`}
              >
                {t('name')}
              </label>
              <div className="relative">
                <input
                  id="fullName"
                  type="text"
                  placeholder={t('placeholder-name')}
                  className={`w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all ${theme == 'dark' ? 'bg-slate-700 text-white placeholder-slate-400' : 'bg-white text-black placeholder-gray-400'}`}
                  {...register('name', { required: true })}
                />
                <FaUserTie
                  className={`absolute top-1/2 -translate-y-1/2 left-3 ${theme == 'dark' ? 'text-slate-300' : 'text-gray-500'}`}
                />
              </div>
              {errors.name && (
                <span className="text-red-500 text-xs mt-1">
                  This field is required!
                </span>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <label
                htmlFor="email"
                className={`block text-sm font-medium ${theme == 'dark' ? 'text-white' : 'text-black'} mb-1`}
              >
                {t('email-address')}
              </label>
              <div className="relative">
                <input
                  id="email"
                  {...register('email', { required: true })}
                  type="email"
                  placeholder={t('placeholder-email')}
                  className={`w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all ${theme == 'dark' ? 'bg-slate-700 text-white placeholder-slate-400' : 'bg-white text-black placeholder-gray-400'}`}
                />
                <IoMail
                  className={`absolute top-1/2 -translate-y-1/2 left-3 ${theme == 'dark' ? 'text-slate-300' : 'text-gray-500'}`}
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-xs mt-1">
                  This field is required!
                </span>
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
                  id="password"
                  {...register('password', { required: true })}
                  type={showPassword ? 'password' : 'text'}
                  placeholder={t('placeholder-password')}
                  className={`w-full px-4 py-3 pl-10 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all ${theme == 'dark' ? 'bg-slate-700 text-white placeholder-slate-400' : 'bg-white text-black placeholder-gray-400'}`}
                />
                <FaLock
                  className={`absolute top-1/2 -translate-y-1/2 left-3 ${theme == 'dark' ? 'text-slate-300' : 'text-gray-500'}`}
                />
                <div
                  onClick={handelShowPassword}
                  className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
                >
                  {showPassword ? (
                    <IoMdEyeOff
                      className={theme == 'dark' ? 'text-white' : 'text-black'}
                    />
                  ) : (
                    <IoEye
                      className={theme == 'dark' ? 'text-white' : 'text-black'}
                    />
                  )}
                </div>
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs mt-1">
                  This field is required!
                </span>
              )}
            </div>

            {/* Profile Picture */}
            <div>
              <label
                className={`block text-sm font-medium ${theme == 'dark' ? 'text-white' : 'text-black'} mb-1`}
              >
                {t('profile')}
              </label>
              <input
                type="file"
                {...register('image', { required: true })}
                className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold ${theme == 'dark' ? 'file:bg-slate-600 file:text-slate-200' : 'file:bg-blue-50 file:text-blue-700'} hover:file:opacity-80 transition-all cursor-pointer`}
              />
              {errors.image && (
                <span className="text-red-500 text-xs mt-1">
                  This field is required!
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all active:scale-[0.98]"
            >
              {t('signup-button')}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="grow border-t border-gray-300"></div>
            <span
              className={`mx-4 text-xs text-gray-500 uppercase tracking-wider`}
            >
              {t('text-h1')}
            </span>
            <div className="grow border-t border-gray-300"></div>
          </div>

          <div className="space-y-3">
            <button
              onClick={HandelSocialLogin}
              className="w-full py-2.5 border border-gray-300 rounded-xl flex items-center justify-center gap-3 bg-white text-gray-800 hover:bg-gray-50 transition-all font-medium text-sm sm:text-base"
            >
              <Image
                width={20}
                height={20}
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
              />
              {t('google-button')}
            </button>
            <button
              onClick={HandelGitHubLogin}
              className="w-full py-2.5 bg-black text-white rounded-xl flex items-center justify-center gap-3 hover:bg-gray-900 transition-all font-medium text-sm sm:text-base"
            >
              <FaGithub size={20} /> {t('github-button')}
            </button>
          </div>

          <p
            className={`text-center  text-sm mt-8 ${theme == 'dark' ? 'text-slate-300' : 'text-gray-600'}`}
          >
            {t('text-p')}
            <Link
              href="/login"
              className="text-blue-600 ml-2 font-semibold hover:underline"
            >
              {t('login-button')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
