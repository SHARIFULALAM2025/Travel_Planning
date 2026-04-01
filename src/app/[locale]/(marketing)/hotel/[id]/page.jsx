import ViewDetailsHotel from '@/Components/Explore_DestinationPages/ViewDetailsHotel/ViewDetailsHotel';
import React from 'react';

const page = ({params}) => {
    return (
      <div>
        <ViewDetailsHotel params={params} />
      </div>
    )
};

export default page;