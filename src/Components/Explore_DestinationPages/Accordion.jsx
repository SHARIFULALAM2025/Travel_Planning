'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { useTheme } from 'next-themes'

const Accordion = ({ title, content,  }) => {
  const [isOpen, setIsOpen] = useState(false)
const {theme}= useTheme()
  return (
    <div className=" ">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center cursor-pointer  p-2 rounded-lg transition-all group"
      >
        <span
          className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} text-lg group-hover:text-indigo-600 transition-colors`}
        >
          {title}
        </span>
        <div
          className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} group-hover:text-indigo-600`}
        >
          {isOpen ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden px-2"
          >
            <div
              className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} leading-relaxed`}
            >
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Accordion
