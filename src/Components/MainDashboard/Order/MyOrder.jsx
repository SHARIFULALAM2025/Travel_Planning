'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React from 'react'

const MyOrder = () => {
  const { data: session } = useSession()

  const { data: order = [] } = useQuery({
    queryKey: ['order'],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL_Backend}/my-order/${session.user?.email}`
      )
      return data
    },
  })
  console.log(order)

  return (
    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis labore
      repellat aperiam nemo ipsa obcaecati iure minima cum nesciunt ex?
    </div>
  )
}

export default MyOrder
