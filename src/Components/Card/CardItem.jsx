import { Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

const CardItem = ({ item, handelDelete, locale, updateGlobalTotal }) => {
  const [plusValue, setPlusValue] = useState(1)
  const unitPrice = parseFloat(item.price?.[locale])
  const handelPlus = () => {
    let x = 1
    let plus = x + plusValue
      setPlusValue(plus)
      updateGlobalTotal(unitPrice)
  }
  const handelMinus = () => {
    let x = 1
    if (plusValue > 1) {
      let Minus = plusValue - x
        setPlusValue(Minus)
         updateGlobalTotal(-unitPrice)
    }
  }
  return (
    <tr key={item._id} className="group">
      <td className="py-6">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={item.image || '/placeholder.jpg'}
              fill
              className="object-cover"
              alt="product"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 leading-tight">
              {item.title?.[locale]}
            </h3>
            <p className="text-sm text-gray-500 mt-1 uppercase">
              {item.category}
            </p>
          </div>
        </div>
      </td>
      <td className="py-6">
        <div className="flex items-center justify-center gap-3 bg-gray-100 dark:bg-slate-800 w-fit mx-auto px-3 py-1.5 rounded-lg">
          <button
            onClick={handelMinus}
            className="hover:text-blue-600 transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="font-bold text-sm w-6 text-center">{plusValue}</span>
          <button
            onClick={handelPlus}
            className="hover:text-blue-600 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </td>
      <td className="py-6 text-right font-bold text-lg">
        ${(unitPrice * plusValue).toFixed(2)}
      </td>
      <td className="py-6 text-right">
        <button
          onClick={() => handelDelete(item._id)}
          className="text-gray-400 hover:text-red-500 transition-colors p-2"
        >
          <Trash2 size={20} />
        </button>
      </td>
    </tr>
  )
}

export default CardItem
