import Bus from '@/Components/Explore_DestinationPages/Bus/Bus';
import Cruise from '@/Components/Explore_DestinationPages/Cruise/Cruise';
import HeroExplore from '@/Components/Explore_DestinationPages/HeroUi/HeroExplore';
import Hotel from '@/Components/Explore_DestinationPages/Hotel/Hotel';
import Trending from '@/Components/Explore_DestinationPages/Trending/Trending';
import Visa from '@/Components/Explore_DestinationPages/Visa/Visa';
import React from 'react';
const ExplorePage = () => {
    return (
        <div>

            <HeroExplore />
            <Trending />
            <Bus />
            <Cruise />
            <Visa />
            <Hotel/>

        </div>
    );
};

export default ExplorePage;