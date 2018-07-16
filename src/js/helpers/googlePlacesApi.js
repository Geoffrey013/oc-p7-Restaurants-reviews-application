class googlePlacesApi {
    constructor() {
        this.service = {};
    }

    initService(GMap) {
        this.service = new google.maps.places.PlacesService(GMap);
    }

    getDetails(restaurantPlaceId) {
        return new Promise((resolve, reject) => {
            this.service.getDetails(
                { placeId: restaurantPlaceId },
                (place, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        resolve(place);
                    } else {
                        reject(status);
                    }
                }
            );
        });
    }

    nearbySearch(location, rad, type) {
        // setup request object
        const request = {
            location: location,
            radius: rad,
            type: type,
            open: true
        };
        // return promise
        return new Promise((resolve, reject) => {
            this.service.nearbySearch(request, function(results, status) {
                if (
                    status === google.maps.places.PlacesServiceStatus.OK ||
                    google.maps.places.PlacesServiceStatus.ZERO_RESULTS
                ) {
                    // resolve promise with results on OK status
                    resolve(results);
                } else {
                    // reject promise otherwise
                    reject(status);
                }
            });
        });
    }
}

export default googlePlacesApi;
