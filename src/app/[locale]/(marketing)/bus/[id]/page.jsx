import ViewBus from '@/Components/Explore_DestinationPages/ViewBus/ViewBus';
import React from 'react';

const page = ({ params }) => {
  return (
    <div>
      <ViewBus params={params} />
    </div>
  )
}

export default page;