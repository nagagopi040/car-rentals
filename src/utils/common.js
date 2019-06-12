export const Common = {
    allCities: ["Benguluru", "Chennai", "Delhi", "Hyderabad", "Mumbai"],
    getCars: async (location, searchText, sort, transmissionType, carType, fuel ) => {
        const cars = await fetch("https://api.sheety.co/311576ae-321a-43e3-9a5b-61b3ac373d85");
        return cars.json();
    }
}