const staticRestaurants = [
    {
        id: 1,
        slug: 'lepatio',
        restaurantName: 'Le Patio',
        address: '16 rue Victor Leydet, 13100 Aix-en-Provence',
        lat: 43.527309,
        long: 5.445616,
        ratings: [
            {
                stars: 4,
                title: 'Très bon moment',
                comment:
                    'Cadre sympathique, accueil charmant et souriant. Plats faits maison et très bons. Le restaurant était complet, donc le service a été un peu long. Mais fait le sourire était là. Donc, on accepte volontiers.',
                author: 'NAJATESS'
            },
            {
                stars: 5,
                title: 'Très bon et très joli interieur',
                comment:
                    'Cuisine excellente, accueil très sympa, de bons conseils pour le vins et cadre très agréable. Que du très bon!!',
                author: 'fxbaix'
            }
        ]
    },
    {
        id: 2,
        slug: 'huecocotte',
        restaurantName: 'Hue Cocotte',
        address: '9 Place Ramus, 13100 Aix-en-Provence',
        lat: 43.528199,
        long: 5.446793,
        ratings: [
            {
                stars: 5,
                title: 'Impeccable!',
                comment:
                    'Accueil chaleureux, resto soigné et très propre. Les assiettes sont généreuses et très gourmandes, le vin bon et bien conseillé. Très bonne adresse! Tout impeccable!',
                author: 'Giulia G'
            },
            {
                stars: 3,
                title: "D'une déception le seul espoir est l'oubli",
                comment:
                    "Petite cocotte bien pleine mais peu savoureuse, plats du quotidien qui se suffisent à eux-mêmes sans ajout de crème ! Pour le dessert, la brioche aurait mérité un peu plus de moelleux avec éventuellement un peu d'alcool au choix du client !",
                author: 'nickarter2016'
            }
        ]
    }
];

export default staticRestaurants;
