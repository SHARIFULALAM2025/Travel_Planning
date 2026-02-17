import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import GoogleIcon from '@mui/icons-material/Google'

const Signup = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Side: Visual/Branding */}
        <div className="relative hidden md:block bg-amber-400">
          <Image
            src="https://i.ibb.co.com/60q3m3WP/Skyward-flight-over-the-city.png"
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

          <form className="space-y-5">
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
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
                required
              />
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
                type="email"
                placeholder="your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                name="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="*******"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
                required
              />
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
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 transition-colors cursor-pointer"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-amber-200/50 transition-all transform active:scale-[0.98] mt-4"
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
              type="button" // Use type="button" so it doesn't accidentally submit the form
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 border border-gray-300 rounded-lg shadow-sm transition-all duration-200 active:scale-[0.98]"
            >
              {/* Google Icon Wrapper */}
              <div className="w-5 h-5 flex items-center justify-center">
                <GoogleIcon />
              </div>

              <span>Continue with Google</span>
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-8">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-amber-600 font-semibold hover:underline"
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
