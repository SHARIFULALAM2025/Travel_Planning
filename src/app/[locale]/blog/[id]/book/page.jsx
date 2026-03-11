import Booking from '@/Components/Booking/Booking';
import React from 'react';

const bookingPage = ({params}) => {
    return (
      <div>
        <Booking params={params} />
      </div>
    )
};

export default bookingPage;