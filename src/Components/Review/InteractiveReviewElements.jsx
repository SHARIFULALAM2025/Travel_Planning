"use client"
import React, { useState } from 'react'
import {
  FaThumbsUp,
  FaThumbsDown,
  FaFlag,
  FaReply,
  FaCheckCircle,
} from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const InteractiveReviewElements = ({ ownerReply }) => {
  const [helpfulCount, setHelpfulCount] = useState(12)
  const [voted, setVoted] = useState(null) // 'helpful' or 'useless'
  const [showReportModal, setShowReportModal] = useState(false)

  // ডামি ডাটা যদি প্রপস না থাকে
  const replyData = ownerReply || {
    name: 'Hotel Management',
    role: 'Property Manager',
    message:
      'Thank you for your wonderful feedback, Arifur! We are glad you enjoyed the mountain view. We have also noted your concern about the WiFi and are currently upgrading our routers to provide a better experience. Hope to see you again soon!',
    date: '2 days ago',
  }

  const handleVote = (type) => {
    if (voted === type) {
      setVoted(null)
      if (type === 'helpful') setHelpfulCount((prev) => prev - 1)
    } else {
      if (voted === 'helpful') setHelpfulCount((prev) => prev - 1)
      setVoted(type)
      if (type === 'helpful') setHelpfulCount((prev) => prev + 1)
    }
  }

  return (
    <div className="space-y-4 mt-6">
      {/* ১. Helpful / Useless & Report Buttons */}
      <div className="flex flex-wrap items-center justify-between py-4 border-t border-gray-100 dark:border-slate-800">
        <div className="flex items-center gap-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Was this helpful?
          </p>

          <div className="flex items-center gap-4">
            {/* Helpful Button */}
            <button
              onClick={() => handleVote('helpful')}
              className={`flex items-center gap-2 text-sm font-medium transition-all ${
                voted === 'helpful'
                  ? 'text-blue-600 scale-110'
                  : 'text-gray-500 hover:text-blue-500'
              }`}
            >
              <FaThumbsUp
                className={
                  voted === 'helpful' ? 'fill-current' : 'outline-current'
                }
              />
              <span>Yes ({helpfulCount})</span>
            </button>

            {/* Useless Button */}
            <button
              onClick={() => handleVote('useless')}
              className={`flex items-center gap-2 text-sm font-medium transition-all ${
                voted === 'useless'
                  ? 'text-orange-600 scale-110'
                  : 'text-gray-500 hover:text-orange-500'
              }`}
            >
              <FaThumbsDown />
              <span>No</span>
            </button>
          </div>
        </div>

        {/* Report Button */}
        <button
          onClick={() => setShowReportModal(true)}
          className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-red-500 transition-colors uppercase"
        >
          <FaFlag />
          Report
        </button>
      </div>

      {/* ২. Owner Response (The Professional Highlight) */}
      <AnimatePresence>
        {replyData && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative ml-4 md:ml-10 mt-4 p-5 bg-slate-50 dark:bg-slate-800/50 border-l-4 border-blue-500 rounded-r-2xl"
          >
            {/* রিপ্লাই ডেকোরেশন আইকন */}
            <div className="absolute -left-3 top-4 bg-blue-500 text-white p-1.5 rounded-full shadow-lg">
              <FaReply className="text-[10px]" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-gray-900 dark:text-white">
                    Response from {replyData.name}
                  </span>
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-[10px] font-bold">
                    <FaCheckCircle size={10} />
                    Official
                  </div>
                </div>
                <span className="text-[11px] text-gray-400 font-medium">
                  {replyData.date}
                </span>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed italic">
                {replyData.message}
              </p>

              <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-500 mt-1">
                — {replyData.role}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ৩. Simple Report Feedback (Optional) */}
      {showReportModal && (
        <p className="text-[10px] text-red-400 animate-pulse font-medium">
          Thank you for reporting. Our moderators will review this soon.
        </p>
      )}
    </div>
  )
}

export default InteractiveReviewElements
