'use client'

import Container from '@/Components/Container/Container'
import Banner from '@/Components/HomePage/Banner/Banner'
import ChooseTour from '@/Components/HomePage/ChooseTour/ChooseTour'

import HeroSection from '@/Components/HomePage/HeroSection/HeroSection'
import LastMinuteOffers from '@/Components/HomePage/LastMinuteOffers/LastMinuteOffers'
import Newsletter from '@/Components/HomePage/Newsletter/Newsletter'
import Personalized from '@/Components/HomePage/Personalized/Personalized'
import PopularDestinations from '@/Components/HomePage/PopularDestinations/PopularDestinations'
import Stories from '@/Components/HomePage/Stories/Stories'
import { useEffect } from 'react'
import toast from 'react-hot-toast'


export default function Home() {


  useEffect(() => {
    const login = sessionStorage.getItem('loginSuccess')

    if (login) {
      toast.success('Login Successfully')
      sessionStorage.removeItem('loginSuccess')
    }
  }, [])


  return (
    <div>
      <Container>
       <Banner />
        <HeroSection />
        <PopularDestinations />
        <Personalized />
        <LastMinuteOffers />
        <ChooseTour />
        <Newsletter />
        <Stories />
      </Container>
    </div>
  )
}
