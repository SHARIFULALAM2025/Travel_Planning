import ViewCruise from '@/Components/Explore_DestinationPages/ViewCruise/ViewCruise';
import React from 'react';

const page = ({params}) => {
    return (
      <div>
        <ViewCruise params={params} />
      </div>
    )
};

export default page;