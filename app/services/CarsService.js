import { AppState } from "../AppState.js";
import { Car } from "../models/Car.js";
import { api } from "./AxiosService.js";

class CarsService {
    async getCars() {
        const response = await api.get('api/Cars')
        const newCars = response.data.map(carPOJO => new Car(carPOJO))
        newCars.reverse()
        AppState.cars = newCars
    }

    async createCar(carFormData) {
        const response = await api.post('api/Cars', carFormData)
        const newCar = new Car(response.data)
        AppState.cars.push(newCar)
        AppState.cars.unshift(newCar)
    }

    async removeCar(carId) {
        const response = await api.delete(`api/Cars/${carId}`)
        const carIndex = AppState.cars.findIndex(car => car.id == carId)
        if (carIndex == -1) {
            throw new Error('Index was -1, you messed up the findIndex')
        }
        AppState.cars.splice(carIndex, 1)
    }

}

export const carsService = new CarsService()