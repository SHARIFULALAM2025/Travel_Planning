'use client'
import { myMailAction } from '@/lib/mailAction';
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';

const InputEmailForm = () => {
    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm();
    const handelEmail = async(data) => {
        const { email } = data;
        await myMailAction({email});
        toast.success("check your email please!")


    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          input email to reset
        </h1>

        <form
          action=""
          className="space-y-6"
          onSubmit={handleSubmit(handelEmail)}
        >
          <fieldset>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              {...register('email', { required: true })}
              type="email"
              placeholder="name@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
            />
            {errors.email && (
              <span className="text-red-700">This field is required</span>
            )}
          </fieldset>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md active:transform active:scale-[0.98]"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default InputEmailForm
