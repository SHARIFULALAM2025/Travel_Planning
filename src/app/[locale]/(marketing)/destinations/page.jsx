import CallToAction from '@/Components/Explore_DestinationPages/CallToAction/CallToAction';
import Explore from '@/Components/Explore_DestinationPages/Explore/Explore';
import Featured from '@/Components/Explore_DestinationPages/Featured/Featured';
import HeroExplore from '@/Components/Explore_DestinationPages/HeroUi/HeroExplore';
import InActiveExplore from '@/Components/Explore_DestinationPages/InteractiveExplore/InActiveExplore';
import SearchDestination from '@/Components/Explore_DestinationPages/SearchDestination/SearchDestination';
import React from 'react';

const Destnations = () => {
  return (
    <div>
      <HeroExplore></HeroExplore>
      <SearchDestination></SearchDestination>
      <Featured></Featured>
      <Explore></Explore>
      <InActiveExplore></InActiveExplore>
      <CallToAction></CallToAction>
    </div>
  );
};

export default Destnations;