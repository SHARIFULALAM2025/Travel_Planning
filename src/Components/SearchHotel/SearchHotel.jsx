'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import React, { useMemo } from 'react'

const SearchHotel = ({ allData }) => {
  const locale = useLocale()

  // 1. Fetching all hotels from the backend
  const { data: hotel = [], isLoading } = useQuery({
    queryKey: ['hotels', locale],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/all-hotel`
      )
      return res.data
    },
  })

  // 2. Filter Logic: Using useMemo to prevent unnecessary re-calculations
  const filterHotel = useMemo(() => {
    if (!allData) return []

    return hotel.filter((item) => {
      try {
        // --- LOCATION FILTER ---
        // We use optional chaining (?.) and provide a fallback string to prevent crashes
        const hotelLocation = item.location?.[locale]?.toLowerCase() || ''
        const searchLocation = allData.location?.toLowerCase() || ''
        const isLocationMatch = hotelLocation.includes(searchLocation)

        // --- GUEST CAPACITY FILTER ---
        // Logic: Hotel capacity must be greater than or equal to requested guests
        // Always use the 'en' key for calculations as Bengali numerals (২০২৬) aren't parsable by parseInt
        const maxAllowed = parseInt(item.maxGuests?.['en'] || 0)
        const requestedGuests = parseInt(allData.TotalGuests || 0)
        const isGuestMatch = maxAllowed >= requestedGuests

        // --- DATE VALIDITY FILTER ---
        // Logic: User's check-in/out must fall within the hotel's availability range
        // We convert strings to Date objects for accurate mathematical comparison
        const checkIn = new Date(allData.checkIn)
        const checkOut = new Date(allData.checkOut)

        // CRITICAL: We use item.availableFrom['en'] because JS Date() doesn't understand Bengali numbers
        const availableFrom = new Date(item.availableFrom?.['en'])
        const availableTo = new Date(item.availableTo?.['en'])

        const isDateValid = checkIn >= availableFrom && checkOut <= availableTo

        // Return true only if all three conditions are met
        return isLocationMatch && isGuestMatch && isDateValid
      } catch (error) {
        console.error('Error in filtering logic:', error)
        return false
      }
    })
  }, [hotel, allData, locale])
  console.log(filterHotel)

  // 3. UI Rendering
   if (isLoading)
     return (
       <div className="flex justify-center items-center min-h-[400px]">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
       </div>
     )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filterHotel.length > 0 ? (
        filterHotel.map((item) => (
          <div
            key={item._id}
            className="flex flex-col border p-4 rounded-lg shadow-sm hover:shadow-md transition bg-white"
          >
            <div className="relative w-full h-48 mb-4 overflow-hidden rounded-md">
              <Image
                src={item.image}
                alt={item.name?.[locale] || 'Hotel Image'}
                fill // Use fill with a parent container for better responsiveness
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <h3 className="font-bold text-lg line-clamp-1">
              {item.name?.[locale]}
            </h3>

            <p className="text-gray-600 text-sm flex-grow">
              {item.location?.[locale]}
            </p>

            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                {item.maxGuests?.[locale]} guests
              </span>
              {/* You could add a 'View Details' button here later */}
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500 py-20 bg-gray-50 rounded-xl border-2 border-dashed">
          <p className="text-xl font-semibold">No hotels found</p>
          <p className="text-sm">
            Try adjusting your location or date filters.
          </p>
        </div>
      )}
    </div>
  )
}

export default SearchHotel
