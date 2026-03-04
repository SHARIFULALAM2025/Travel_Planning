'use client'
import React, { useState, useEffect } from 'react'
import { FaStar, FaCloudUploadAlt, FaTimes, FaMagic } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const AddReviewModal = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [images, setImages] = useState([]) // এখানে ফাইল অবজেক্ট এবং প্রিভিউ ইউআরএল থাকবে
  const [selectedTags, setSelectedTags] = useState([])
  const [reviewText, setReviewText] = useState('')

  const suggestions = [
    'Great view',
    'Bad WiFi',
    'Friendly Staff',
    'Clean Room',
    'Expensive',
    'Central Location',
  ]

  // ইমেজ হ্যান্ডলিং
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file), // প্রিভিউ এর জন্য URL তৈরি
    }))
    setImages((prev) => [...prev, ...newImages])
  }

  const removeImage = (e, index) => {
    e.preventDefault()
    // মেমোরি থেকে URL রিলিজ করা
    URL.revokeObjectURL(images[index].preview)
    setImages(images.filter((_, i) => i !== index))
  }

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      rating,
      tags: selectedTags,
      review: reviewText,
      // ডাটাবেসে পাঠানোর জন্য images[index].file ব্যবহার করবেন
      imageFiles: images.map((img) => img.file),
    }
    console.log('Review Submitted:', formData)

    // ক্লিনআপ: সব প্রিভিউ ইউআরএল রিলিজ করা
    images.forEach((img) => URL.revokeObjectURL(img.preview))
    setImages([])
    setRating(0)
    setReviewText('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative"
      >
        <div className="max-h-[90vh] overflow-y-auto p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Share Your Experience
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <FaTimes className="text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ১. রেটিং */}
            <div className="text-center py-6 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/20">
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3 uppercase tracking-wider">
                How was your trip?
              </p>
              <div className="flex justify-center gap-2">
                {[...Array(5)].map((_, index) => {
                  const starValue = index + 1
                  return (
                    <button
                      key={index}
                      type="button"
                      className="transition-transform active:scale-90 focus:outline-none"
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHover(starValue)}
                      onMouseLeave={() => setHover(0)}
                    >
                      <FaStar
                        size={38}
                        className={`transition-colors duration-200 ${starValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-700'}`}
                      />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ২. ট্যাগস */}
            <div>
              <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <FaMagic className="text-blue-500 text-xs" /> Quick Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-all border ${selectedTags.includes(tag) ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-transparent border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-400 hover:border-blue-500'}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* ৩. টেক্সট এরিয়া */}
            <textarea
              rows="4"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Describe your experience in detail..."
              className="w-full p-4 bg-gray-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none text-sm text-gray-800 dark:text-gray-200 transition-all shadow-inner"
            />

            {/* ৪. ইমেজ প্রিভিউ গ্রিড (<img> ট্যাগ ব্যবহার করে) */}
            <div className="space-y-4">
              <label className="group relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-2xl cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaCloudUploadAlt
                    size={30}
                    className="text-gray-400 group-hover:text-blue-500 mb-2 transition-colors"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Upload photos
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>

              <AnimatePresence>
                {images.length > 0 && (
                  <div className="grid grid-cols-4 gap-3">
                    {images.map((img, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative h-20 rounded-xl overflow-hidden group border dark:border-slate-700"
                      >
                        {/* প্রিভিউয়ের জন্য <img> ট্যাগ সবচেয়ে ভালো কাজ করে */}
                        <img
                          src={img.preview}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={(e) => removeImage(e, idx)}
                          className="absolute top-1 right-1 bg-red-500/80 backdrop-blur-sm text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                          <FaTimes size={10} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="submit"
              disabled={!rating}
              className={`w-full py-4 font-bold rounded-2xl shadow-lg transition-all active:scale-[0.98] ${!rating ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30'}`}
            >
              Post Review
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default AddReviewModal
