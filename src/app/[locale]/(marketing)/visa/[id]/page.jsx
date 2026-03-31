import VisaDetails from '@/Components/Explore_DestinationPages/VisaDetails/VisaDetails';
import React from 'react';

const page = ({params}) => {
    return (
      <div>
        <VisaDetails params={params} />
      </div>
    )
};

export default page;