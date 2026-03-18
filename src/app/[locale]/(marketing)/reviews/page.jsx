import AddReviewModal from '@/Components/Review/AddReviewModal';
import InteractiveReviewElements from '@/Components/Review/InteractiveReviewElements';
import ReviewCard from '@/Components/Review/ReviewCard';
import ReviewFilters from '@/Components/Review/ReviewFilters';
import ReviewSummary from '@/Components/Review/ReviewSummary';
import React from 'react';

const Reviews = () => {
    return (
      <div>
        <ReviewSummary />
        <ReviewFilters />
        <ReviewCard />
        <InteractiveReviewElements />
        <AddReviewModal/>
      </div>
    )
};

export default Reviews;