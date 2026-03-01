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
import { IoEye } from 'react-icons/io5'
import { useTheme } from 'next-themes'

const Login = () => {
  const [showPassword, setShowPassword] = useState(true)
  const handelShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const router = useRouter()

  const handleSocialLogin = async (provider) => {
    const res = await signIn(provider, { redirect: false })
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
      className={`${theme == 'dark' ? 'bg-slate-900' : 'bg-white'} min - h - screen  flex items-center justify-center p-5`}
    >
      <div className="w-full max-w-5xl  rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-white/40">
        {/* Left Section */}
        <div className="relative hidden md:block">
          <Image
            src="/assets/login.gif"
            alt="Login Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-12 text-white">
            <h2 className="text-4xl font-bold leading-tight">Welcome Back</h2>
            <p className="mt-3 text-lg text-gray-200">
              The community is waiting for you.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-10 md:p-14 flex flex-col justify-center">
          <div className="mb-10">
            <p
              className={`  font-bold ${theme == 'dark' ? 'text-white' : 'text-black'}`}
            >
              Enter your credentials to access your account
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
            {/* Email */}
            <div>
              <label
                className={`block text-sm font-medium ${theme == 'dark' ? 'text-white' : 'text-black'} mb-1`}
              >
                Email Address:
              </label>
              <input
                {...register('email', { required: true })}
                type="email"
                placeholder="Enter your email"
                className={`mt-2 w-full px-4 py-3 rounded-xl border border-gray-300
                           focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                          outline-none transition-all
                        placeholder:text-gray-400 text-gray-800  ${theme == 'dark' ? 'text-white' : 'text-black'}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <div className="flex justify-between">
                <label
                  className={`block text-sm font-medium ${theme == 'dark' ? 'text-white' : 'text-black'} mb-1`}
                >
                  Password:
                </label>
              </div>

              <input
                {...register('password', { required: true })}
                type={showPassword ? 'password' : 'text'}
                placeholder="Enter your password"
                className={`mt-2 w-full px-4 py-3 rounded-xl border border-gray-300
                           focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                          outline-none transition-all
                        placeholder:text-gray-400 text-gray-800  ${theme == 'dark' ? 'text-white' : 'text-black'}`}
              />
              <div
                onClick={handelShowPassword}
                className="absolute  top-12 right-6"
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
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  Password is required
                </p>
              )}
            </div>

            {/* Remember */}
            <div className=" text-sm text-end">
              <Link
                href="/reset"
                className={`text-sm ${theme == 'dark' ? 'text-white' : 'text-indigo-600'}  hover:underline`}
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-indigo-400/40 transition-all active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="grow border-t border-gray-300"></div>
            <span
              className={`mx-4 text-sm ${theme == 'dark' ? 'text-white' : 'text-black'} text-gray-500 uppercase tracking-wider`}
            >
              Or continue with
            </span>
            <div className="grow border-t border-gray-300"></div>
          </div>

          {/* Google */}
          <button
            onClick={() => handleSocialLogin('google')}
            className="w-full py-3 border border-gray-300 rounded-xl flex items-center justify-center gap-3 bg-white text-gray-800 hover:bg-gray-200 transition-all font-medium"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>

          {/* GitHub */}
          <button
            onClick={() => handleSocialLogin('github')}
            className="w-full mt-4 py-3 bg-black text-white rounded-xl flex items-center justify-center gap-3 hover:bg-gray-900 transition-all font-medium"
          >
            <FaGithub size={20} />
            Continue with GitHub
          </button>

          <p
            className={`text-center text-sm  mt-3  ${theme == 'dark' ? 'text-white' : 'text-black'}`}
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
