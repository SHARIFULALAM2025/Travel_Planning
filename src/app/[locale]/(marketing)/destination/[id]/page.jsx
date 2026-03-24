import AllDestination from '@/Components/Destination/AllDestination';
import React from 'react';

const MultipleDestination =async ({ params }) => {
     const resolvedParams = await params

    return (
      <div>
        <AllDestination id={resolvedParams.id} />
      </div>
    )
};

export default MultipleDestination;