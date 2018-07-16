const rawTagsTranslations = {
    lodging: 'hôtel',
    meal_delivery: 'livraison',
    meal_takeaway: 'à emporter',
    food: 'repas',
    cafe: 'café',
    bakery: 'boulangerie',
    point_of_interest: "centre d'intérêt",
    bar: 'bar',
    store: 'magasin',
    restaurant: 'restaurant',
    night_club: 'boîte de nuit',
    gym: 'gym',
    health: 'santé',
    gas_station: 'station carburants',
    car_wash: 'lave-auto',
    spa: 'spa',
    parking: 'parking'
};

export default function(rawTag) {
    return rawTagsTranslations[rawTag];
}
