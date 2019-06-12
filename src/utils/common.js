export const Common = {
    allCities: ["Koramangala", "HSR Layout", "Indiranagar"],
    getCars: async () => {
        const cars = await fetch("https://api.sheety.co/311576ae-321a-43e3-9a5b-61b3ac373d85");
        return cars.json();
    },
    getCarsFromLocation: (cars, location) => {
        let allCars = cars.filter( car => car.location === location);
        return allCars;
    },
    getNoOfPages: (cars, location) => {
        var carJson = Common.getCarsFromLocation(cars, location)
        return Math.ceil(carJson.length/6)
    },
    getCarsForLimit: (cars, location, offset, limit) => {
        var carsJson = Common.getCarsFromLocation(cars, location);
        return carsJson.slice(offset, limit);
    }

}