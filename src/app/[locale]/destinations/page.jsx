import Featured from '@/Components/Explore_DestinationPages/Featured/Featured';
import HeroExplore from '@/Components/Explore_DestinationPages/HeroUi/HeroExplore';
import SearchDestination from '@/Components/Explore_DestinationPages/SearchDestination/SearchDestination';
import React from 'react';

const Destnations = () => {
  return (
    <div>
      <HeroExplore></HeroExplore>
      <SearchDestination></SearchDestination>
      <Featured></Featured>
    </div>
  );
};

export default Destnations;