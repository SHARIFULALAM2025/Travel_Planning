import SingleDestination from '@/Components/Destination/SingleDestination'
import React from 'react'

const page = async ({ params }) => {

  const { id, tourId, locale } = await params
  console.log(id, tourId)



  return (
    <div>

      <SingleDestination destId={id} tourId={tourId} locale={locale} />
    </div>
  )
}

export default page
