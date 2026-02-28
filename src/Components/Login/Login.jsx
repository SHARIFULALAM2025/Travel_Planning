'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { FaGithub } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'

const Login = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 flex items-center justify-center p-5">
      
      <div className="w-full max-w-5xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-white/40">

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
            <h2 className="text-4xl font-bold leading-tight">
              Welcome Back
            </h2>
            <p className="mt-3 text-lg text-gray-200">
              The community is waiting for you.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-10 md:p-14 flex flex-col justify-center">

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Login
            </h2>
            <p className="text-gray-500 mt-2">
              Enter your credentials to access your account
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                {...register('email', { required: true })}
                type="email"
                placeholder="Enter your email"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 
                           focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                          outline-none transition-all 
                        placeholder:text-gray-400 text-gray-800"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  Email is required
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  href="/reset"
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Forgot?
                </Link>
              </div>

              <input
                {...register('password', { required: true })}
                type="password"
                placeholder="Enter your password"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 
                           focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                          outline-none transition-all 
                        placeholder:text-gray-400 text-gray-800"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  Password is required
                </p>
              )}
            </div>

            {/* Remember */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                Remember me
              </label>
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
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-sm text-gray-500 uppercase tracking-wider">
              Or continue with
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
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

          <p className="text-center text-sm text-gray-600 mt-8">
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