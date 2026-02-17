import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import GoogleIcon from '@mui/icons-material/Google'
const Login = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Side: Visual/Branding (Consistent with Signup) */}
        <div className="relative hidden md:block bg-amber-400">
          <Image
            src="https://i.ibb.co.com/60q3m3WP/Skyward-flight-over-the-city.png"
            alt="Workspace inspiration"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-10 text-white">
            <h2 className="text-4xl font-bold">Welcome Back.</h2>
            <p className="mt-2 text-lg">The community is waiting for you.</p>
          </div>
        </div>

        {/* Right Side: The Login Form */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Login</h2>
            <p className="text-gray-500 mt-2">
              Enter your credentials to access your account.
            </p>
          </div>

          <form className="space-y-5">
            {/* Email Address */}
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
                placeholder="enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between mb-1">
                <label
                  htmlFor="password"
                  name="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  size="sm"
                  className="text-sm text-amber-600 hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded cursor-pointer"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700 cursor-pointer"
              >
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-amber-200/50 transition-all transform active:scale-[0.98] mt-2"
            >
              Sign In
            </button>
          </form>

          {/* Social Login Divider (Optional but professional) */}
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

          <p className="text-center text-sm text-gray-600">
            Don not have an account?{' '}
            <Link
              href="/signup"
              className="text-amber-600 font-semibold hover:underline"
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
