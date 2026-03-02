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
import { useRouter } from 'next/navigation' // router missing ছিল ইমপোর্টে

import { FaGithub } from 'react-icons/fa6'
import { useTheme } from 'next-themes'
import { IoEye } from 'react-icons/io5'
import { IoMdEyeOff } from 'react-icons/io'

const Signup = () => {
  const [showPassword, setShowPassword] = useState(true)
  const handelShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const router = useRouter()

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

  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div
      className={`min-h-screen ${theme == 'dark' ? 'bg-slate-900' : 'bg-slate-50'} flex items-center justify-center p-4 sm:p-6`}
    >
      <div className="max-w-5xl w-full rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-white/10">
        {/* Left Side: Visual/Branding - Mobile এ hidden থেকে tablet/laptop এ আসবে */}
        <div className="relative h-64 lg:h-auto overflow-hidden  bg-blue-400">
          <Image
            src="/assets/signup.png"
            alt="Workspace inspiration"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-10 text-white">
            <h2 className="text-4xl font-bold">Elevate your workflow.</h2>
            <p className="mt-2 text-lg">Join 10k+ professionals today.</p>
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
              Create Account
            </h2>
            <p
              className={`mt-2 text-sm sm:text-base font-medium ${theme == 'dark' ? 'text-slate-300' : 'text-gray-600'} text-center md:text-left`}
            >
              Start your journey with us.
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
                Full Name:
              </label>
              <div className="relative">
                <input
                  id="fullName"
                  type="text"
                  placeholder="Your name"
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
                Email Address:
              </label>
              <div className="relative">
                <input
                  id="email"
                  {...register('email', { required: true })}
                  type="email"
                  placeholder="you@email.com"
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
                Password:
              </label>
              <div className="relative">
                <input
                  id="password"
                  {...register('password', { required: true })}
                  type={showPassword ? 'password' : 'text'}
                  placeholder="Enter password"
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
                Profile Picture
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
              Sign Up
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="grow border-t border-gray-300"></div>
            <span
              className={`mx-4 text-xs text-gray-500 uppercase tracking-wider`}
            >
              Or continue with
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
              Login with Google
            </button>
            <button
              onClick={HandelGitHubLogin}
              className="w-full py-2.5 bg-black text-white rounded-xl flex items-center justify-center gap-3 hover:bg-gray-900 transition-all font-medium text-sm sm:text-base"
            >
              <FaGithub size={20} /> Login with GitHub
            </button>
          </div>

          <p
            className={`text-center text-sm mt-8 ${theme == 'dark' ? 'text-slate-300' : 'text-gray-600'}`}
          >
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
