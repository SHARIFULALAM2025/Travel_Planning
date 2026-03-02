"use client"
import Banner from "@/Components/HomePage/Banner/Banner";
import ChooseTour from "@/Components/HomePage/ChooseTour/ChooseTour";
import Features from "@/Components/HomePage/Features/Features";
import HeroSection from "@/Components/HomePage/HeroSection/HeroSection";
import LastMinuteOffers from "@/Components/HomePage/LastMinuteOffers/LastMinuteOffers";
import Newsletter from "@/Components/HomePage/Newsletter/Newsletter";
import Personalized from "@/Components/HomePage/Personalized/Personalized";
import PopularDestinations from "@/Components/HomePage/PopularDestinations/PopularDestinations";
import Stories from "@/Components/HomePage/Stories/Stories";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";


export default function Home() {
  const searchParams = useSearchParams()
  const loginStatus = searchParams.get('login')

  useEffect(() => {
    if (loginStatus === 'success') {
      toast.success('Successfully logged in with Google!')

      
      const newUrl = window.location.pathname
      window.history.replaceState({}, '', newUrl)
    }
  }, [loginStatus])
  return (
    <div>
      <Banner />
      <HeroSection />
      <PopularDestinations />
      <Personalized />
      <LastMinuteOffers />
      <ChooseTour />
      <Stories />

      <Features />
      <Newsletter />

    </div>
  );
}
