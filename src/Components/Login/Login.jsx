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

const Login = () => {
  const [showPassword, setShowPassword] = useState(true)
  const handelShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const router = useRouter()

  const handleSocialLogin = async () => {
    const res = await signIn("google", { redirect: false })
    if (res?.error) {
      toast.error('Login Failed!')
    } else {
      toast.success('Welcome back!')
      router.push('/')
    }
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

  if (!mounted) return null

  return (
    <div
      className={`${theme == 'dark' ? 'bg-slate-900' : 'bg-white'} min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10`}
    >
      <div className="w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-white/40">
        {/* Left Section - Hidden on Mobile/Tablet or adjusted height */}
        <div className="relative h-64 lg:h-auto overflow-hidden">
          <Image
            src="/assets/login.gif"
            alt="Login Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-12 text-white">
            <h2 className="text-2xl md:text-4xl font-bold leading-tight">
              Welcome Back
            </h2>
            <p className="mt-2 md:mt-3 text-sm md:text-lg text-gray-200">
              The community is waiting for you.
            </p>
          </div>
        </div>

        {/* Right Section - Content padding adjusted for small screens */}
        <div
          className={`p-6 sm:p-10 md:p-14 flex flex-col justify-center ${theme == 'dark' ? 'bg-slate-800 lg:bg-transparent' : 'bg-white lg:bg-transparent'}`}
        >
          <div className="mb-6 md:mb-10">
            <p
              className={`font-bold text-sm md:text-base ${theme == 'dark' ? 'text-white' : 'text-black'}`}
            >
              Enter your credentials to access your account
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
                Email Address:
              </label>
              <div className="relative">
                <input
                  {...register('email', { required: true })}
                  type="email"
                  placeholder="Enter your email"
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
                Password:
              </label>
              <div className="relative">
                <input
                  {...register('password', { required: true })}
                  type={showPassword ? 'password' : 'text'}
                  placeholder="Enter your password"
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
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6 md:my-8">
            <div className="grow border-t border-gray-300"></div>
            <span
              className={`mx-4 text-[10px] md:text-sm ${theme == 'dark' ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}
            >
              Or continue with
            </span>
            <div className="grow border-t border-gray-300"></div>
          </div>

          {/* Social Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleSocialLogin('google')}
              className="w-full py-3 border border-gray-300 rounded-xl flex items-center justify-center gap-3 bg-white text-gray-800 hover:bg-gray-50 transition-all font-medium text-sm md:text-base"
            >
              <FcGoogle size={20} /> Continue with Google
            </button>

            <button
              onClick={() => handleSocialLogin('github')}
              className="w-full py-3 bg-black text-white rounded-xl flex items-center justify-center gap-3 hover:bg-gray-900 transition-all font-medium text-sm md:text-base"
            >
              <FaGithub size={20} /> Continue with GitHub
            </button>
          </div>

          <p
            className={`text-center text-xs md:text-sm mt-6 ${theme == 'dark' ? 'text-white' : 'text-black'}`}
          >
            Don’t have an account?{' '}
            <Link
              href="/signup"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
