'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { uploadImage } from '../ReusableFunction/UploadImage'
import bcrypt from 'bcryptjs'
import { signIn } from 'next-auth/react'
import { postUser } from '@/app/option/saveUser'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const Signup = () => {
  const router=useRouter()
  const HandelSocialLogin = async () => {
    const res = await signIn('google', { redirect: false })
    if (res?.error) {
      toast.error('Login Failed!')
    } else {
      toast.success("sign up successfully!");
      router.push("/")

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
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
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
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Create Account
            </h2>
            <p className="text-gray-500 mt-2">Start your journey with us.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(handleSignUp)}>
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
             text-gray-900 placeholder-gray-500 placeholder-opacity-100
             focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
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
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                {...register('email', { required: true })}
                type="email"
                placeholder="you@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
             text-gray-900 placeholder-gray-500 placeholder-opacity-100
             focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
              />
              {errors.email && (
                <span className="text-red-600">This field is required !</span>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                {...register('password', { required: true })}
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
             text-gray-900 placeholder-gray-500 placeholder-opacity-100
             focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
              />
              {errors.password && (
                <span className="text-red-600">This field is required !</span>
              )}
            </div>

            {/* Profile Picture (File Input) */}
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700 mb-1"
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
              className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-amber-200/50 transition-all transform active:scale-[0.98] mt-4"
            >
              Sign Up
            </button>
          </form>
          <div className=" flex items-center ">
            {/* Left Line */}
            <div className="grow border-t border-black"></div>

            {/* OR Text */}
            <span className="shrink mx-4 text-black text-sm font-medium uppercase tracking-wider">
              Or
            </span>

            {/* Right Line */}
            <div className="grow border-t border-black"></div>
          </div>
          <div className="">
            <button
              onClick={HandelSocialLogin}
              className="w-full  py-2 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 text-black"
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

          <p className="text-center text-sm text-gray-600 mt-8">
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
