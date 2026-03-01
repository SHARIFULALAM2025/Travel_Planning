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

import { FaGithub } from 'react-icons/fa6'
import { useTheme } from 'next-themes'
import { IoEye } from 'react-icons/io5'
import { IoMdEyeOff } from 'react-icons/io'

const Signup = () => {

  const [showPassword, setShowPassword] = useState(true);
  const handelShowPassword = () => {
    setShowPassword(!showPassword)
  }



  const HandelSocialLogin = async () => {
    const res = await signIn('google', { redirect: false })
    if (res?.error) {
      toast.error('Login Failed!')
    } else {
      toast.success('sign up successfully!')
      router.push('/')
    }
  }
  const HandelGitHubLogin = async () => {
    const res = await signIn('github', { redirect: false })
    if (res?.error) {
      toast.error('Login Failed!')
    } else {
      toast.success('sign up successfully!')
      router.push('/')
    }
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
        toast.dismiss('email already exist')
      } else {
        console.error(error)
        toast.error('something went wrong')
      }
    }
  }
  // theme
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  return (
    <div
      className={` min - h - screen ${theme == 'dark' ? 'bg-slate-900' : 'bg-white'}  flex items-center justify-center p-6`}
    >
      <div className="max-w-5xl w-full  rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Side: Visual/Branding */}
        <div className="relative hidden md:block bg-blue-400">
          <Image
            src="/assets/signup.png"
            alt="Workspace inspiration"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-10 text-white">
            <h2 className="text-4xl font-bold">Elevate your workflow.</h2>
            <p className="mt-2 text-lg">Join 10k+ professionals today.</p>
          </div>
        </div>

        {/* Right Side: The Form */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-4">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Create Account
            </h2>
            <p
              className={` text-xl text-center font-bold ${theme == 'dark' ? 'text-white' : 'text-black'}`}
            >
              Start your journey with us.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(handleSignUp)}>
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className={`block text-sm font-medium ${theme == 'dark' ? 'text-white' : 'text-black'} mb-1`}
              >
                Full Name:
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Your name"
                className={`w-full px-4 py-3 border ${theme == 'dark' ? 'text-white' : 'text-black'} border-gray-300 rounded-lg
             text-gray-900 placeholder-gray-500 placeholder-opacity-100
             focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all`}
                {...register('name', { required: true })}
              />
              {errors.name && (
                <span className="text-red-600">This field is required !</span>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className={`block ${theme == 'dark' ? 'text-white' : 'text-black'} text-sm font-medium text-gray-700 mb-1`}
              >
                Email Address:
              </label>
              <input
                id="email"
                {...register('email', { required: true })}
                type="email"
                placeholder="you@email.com"
                className={`w-full ${theme == 'dark' ? 'text-white' : 'text-black'} px-4 py-3 border border-gray-300 rounded-lg
             text-gray-900 placeholder-gray-500 placeholder-opacity-100
             focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all`}
              />
              {errors.email && (
                <span className="text-red-600">This field is required !</span>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label
                className={`block text-sm font-medium ${theme == 'dark' ? 'text-white' : 'text-black'} mb-1`}
              >
                Password:
              </label>
              <input
                id="password"
                {...register('password', { required: true })}
                type={showPassword ? 'password' : 'text'}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 border   rounded-lg
             text-gray-900 placeholder-gray-500 placeholder-opacity-100
             focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all ${theme == 'dark' ? 'text-white' : 'text-black'}`}
              />
              <div
                onClick={handelShowPassword}
                className="absolute  top-10 right-6"
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
                <span className="text-red-600">This field is required !</span>
              )}
            </div>

            {/* Profile Picture (File Input) */}
            <div>
              <label
                htmlFor="avatar"
                className={`block text-sm font-medium ${theme == 'dark' ? 'text-white' : 'text-black'} mb-1`}
              >
                Profile Picture
              </label>
              <input
                id="avatar"
                type="file"
                {...register('image', { required: true })}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors cursor-pointer"
              />
              {errors.image && (
                <span className="text-red-600">This field is required !</span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-indigo-400/40 transition-all active:scale-[0.98]"
            >
              Sign Up
            </button>
          </form>
          <div className="  ">
            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="grow border-t border-gray-300"></div>
              <span
                className={`mx-4 text-sm text-gray-500 uppercase tracking-wider
                 ${theme == 'dark' ? 'text-white' : 'text-black'} `}
              >
                Or continue with
              </span>
              <div className="grow border-t border-gray-300"></div>
            </div>
          </div>
          <div className="">
            <button
              onClick={HandelSocialLogin}
              className="w-full py-3 border border-gray-300 rounded-xl flex items-center justify-center gap-3 bg-white  text-gray-800 hover:bg-gray-300 hover:shadow-amber-50 transition-all font-medium"
            >
              <Image
                width={100}
                height={20}
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5"
                alt="Google"
              />
              Login with Google
            </button>
          </div>
          <div className=" flex items-center ">{/* Right Line */}</div>
          <div className="">
            <button
              onClick={HandelGitHubLogin}
              className="w-full mt-4 py-3 bg-black text-white rounded-xl flex items-center justify-center gap-3 hover:bg-gray-900 transition-all font-medium"
            >
              <FaGithub></FaGithub>
              Login with GitHub
            </button>
          </div>

          <p
            className={` ${theme == 'dark' ? 'text-white' : 'text-black'} text-center text-sm text-gray-600 mt-8`}
          >
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-blue-600 font-semibold hover:underline "
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
