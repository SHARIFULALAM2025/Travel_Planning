import Banner from '@/Components/HomePage/Banner/Banner'
import SearchHotel from '@/Components/SearchHotel/SearchHotel'
import React from 'react'
const SearchData = async({ searchParams }) => {
const params = await searchParams
  const allData = {
    location: params?.location,
    checkIn: params?.checkIn,
    checkOut: params?.checkOut,
    TotalGuests: params?.guests,
  }
console.log(allData)


    return (
      <div>
        <Banner allData={allData} />
        <SearchHotel allData={allData} />
      </div>
    )
}

export default SearchData
