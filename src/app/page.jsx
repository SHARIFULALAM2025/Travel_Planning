import Banner from "@/Components/HomePage/Banner/Banner";
import Features from "@/Components/HomePage/Features/Features";
import Personalized from "@/Components/HomePage/Personalized/Personalized";
import PopularDestinations from "@/Components/HomePage/PopularDestinations/PopularDestinations";
import Stories from "@/Components/HomePage/Stories/Stories";


export default function Home() {
  return (
    <div>
      <Banner />
      <PopularDestinations />
      <Personalized />
      <Stories />
      <Features />
    </div>
  );
}
