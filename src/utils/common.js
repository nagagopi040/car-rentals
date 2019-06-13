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
        return Math.ceil(carJson.length/6);
    },
    getCarsForLimit: (cars, sort, offset, limit, searchCar) => {
        let carsJson = Common.getSortedCars(cars, sort);
        let searchedCars = Common.getSearchedCar(carsJson, searchCar);
        return searchedCars.slice(offset, limit);
    },
    getSortedCars: (cars, sort) => {
        return cars.sort( (a,b) => {
            if(sort==="ASC")return a.price - b.price
            else if(sort==="DESC") return b.price - a.price;
        })
    },
    getSearchedCar: (cars, searchCar) => {
        if(searchCar){
            return cars.filter( ({ name, car_Type }) => (name.search(new RegExp(searchCar, "i")) !== -1) || (car_Type.search(new RegExp(searchCar, "i")) !== -1))
        }
        return cars;
    }
}