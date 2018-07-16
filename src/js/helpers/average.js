const getAverageRoundedRate = reviewsArray => {
    let totalRates = 0;
    reviewsArray.forEach(review => {
        totalRates = totalRates + review.rating;
    });

    return Math.round(totalRates / reviewsArray.length);
};

export default getAverageRoundedRate;
