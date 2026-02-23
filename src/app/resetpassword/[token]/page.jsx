'use client'
import { UpdatePassword } from '@/lib/updatepassword'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

const PasswordReset = ({ params }) => {
  const { token } = React.use(params)
  const {
    register,
    handleSubmit,

    formState: { errors },
    } = useForm()
    const router=useRouter()
  const handelResetPassword = async (data) => {
    const { newPassword, newConfirmPassword } = data
    if (!newPassword === newConfirmPassword) {
      alert('password not mass')
      return
    }
      await UpdatePassword({ newPassword, token });
      router.push("/login")

  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset Your Password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please set your new password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(handelResetPassword)}
          >
            {/* New Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  {...register('newPassword', { required: true })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="••••••••"
                />
                {errors.newPassword && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  {...register('newConfirmPassword', { required: true })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="••••••••"
                />
                {errors.newConfirmPassword && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PasswordReset
