'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'

const Accordion = ({ title, content,  }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className=" ">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center cursor-pointer  p-2 rounded-lg transition-all group"
      >
        <span className="font-bold text-slate-100 text-lg group-hover:text-indigo-600 transition-colors">
          {title}
        </span>
        <div className="text-slate-400 group-hover:text-indigo-600">
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
            <div className=" text-slate-100 leading-relaxed">{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Accordion
